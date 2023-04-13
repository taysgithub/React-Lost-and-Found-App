// Scss
import "./Edit-Post.scss";
// React
import { useState, useEffect } from "react";
// Component
import { ComposeForm } from "../Compose-Form";
import { ComposeCarousel } from "../Compose-Carousel";
// Bootstrap
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
// Firebase
import { serverTimestamp, doc, updateDoc, arrayRemove, arrayUnion, } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { db, storage, upload, getDownloadUrl, uploadResumable } from "../../../../firebase";
// Hook
import useApp from "../../../../Hook/useApp";
import useAuth from "../../../../Hook/useAuth";
import usePosts from "../../../../Hook/usePosts";
// Context
import useCompose from "../../../../Hook/useCompose";

export const EditPost = (props) => {

    const {
        navigate,  
    } = useApp();

    const {
        posts,
        setIsLoadingImg
    } = usePosts();

    const {
        user,
    } = useAuth();

    const {
        photos, 
        setPhotos,
        localUrls, 
        setLocalUrls,
        validated, 
        setValidated,
        inProgress, 
        setInProgress,
        returnSpinner,
        imageCompression,    } = useCompose();
    
    const post = props.post;
    const [show, setShow] = useState(false);

    const toggleModal = () => {
        setShow(!show);  
        setPhotos([]);           
    };

    const handleEdit = async (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation();
        }
        else{
            await Edit(post.postId, event);
            form.reset();
            navigate('/myposts');
        }
        setValidated(true);
    };

    const Edit = async (id, e) => {
        setInProgress(true);
        const editRef = doc(db, "posts", id);
        const form = {
            name : e.target[0].value,
            email: e.target[1].value,
            phone: e.target[2].value,
            description: e.target[3].value,
            timestamp: serverTimestamp()
        }
        try {
            for (const post of posts){
                if(post.postId === id){
                    await updateDoc(editRef, form);                 
                    if(photos.length !== 0){
                        setIsLoadingImg(true);
                        const updateDocRef = doc(db, "posts", post.postId);
                        for(const photoDirectory of post.photoDirectories){
                            const deleteStorageRef = ref(storage, photoDirectory);
                            // Delete the old image in storage
                            await deleteObject(deleteStorageRef).then( async () => {
                                // Delete the old image dirctory in doc
                                await updateDoc(updateDocRef, {
                                    photoDirectories: arrayRemove(photoDirectory),
                                });
                            }).catch(err => {
                                alert("Error, please try again.");
                                console.log(err);
                            })
                        }
                        for(const photoUrl of post.photoUrls){
                            await updateDoc(updateDocRef, {
                                photoUrls: arrayRemove(photoUrl)
                            })
                        }
                        
                        const options = {
                            maxSizeMB: 1,
                            maxWidthOrHeight: 466,
                            useWebWorker: true,
                        }
                        for (const photo of photos){
                            const photoDirectory = `images/${user.uid}/${post.postId}/${photo.name}`;
                            const photoRef = ref(storage, photoDirectory);
                            const compressedPhoto = await imageCompression(photo, options);
                            const uploadTask = uploadResumable(photoRef, compressedPhoto);
                            await upload(photoRef, compressedPhoto).then(async () => {
                                await getDownloadUrl(uploadTask.snapshot.ref).then( async (downloadURL) => {
                                    await updateDoc(updateDocRef, {
                                        photoUrls: arrayUnion(downloadURL)
                                    })
                                });
                                await updateDoc(updateDocRef, {
                                    photoDirectories: arrayUnion(photoDirectory)
                                })
                            })
                        }
                        // await updateDoc(editRef, form);
                        setIsLoadingImg(false);
                    }
                }
            }
            setInProgress(false);
            setShow(false);
        } catch(err){
            alert("Error, please try again.");
            console.log(err);
        }
    }

    useEffect(() => {
        setPhotos([]);
        setValidated(false);
    }, []);

    return (
        <div className="edit-post">
            <Button variant="dark" size="sm" className="smallBtn" onClick={toggleModal}>
                Edit
            </Button>
            <Modal
                show={show}
                onHide={toggleModal}
                backdrop="static"
                keyboard={false}
                centered
                scrollable
            >
                <Modal.Header closeButton>
                    <Modal.Title>Edit</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ComposeCarousel show={show}/>
                    <ComposeForm 
                        post={post}
                        fn={handleEdit} 
                    />
                </Modal.Body>
            </Modal>
        </div>
    )
}