import "./Edit-Post.scss";
import { useContext, useState } from "react";
import { AppContext } from "../../../../App";
import { ComposeContext } from "../../Compose";
import { ComposeForm } from "../Compose-Form";
import { db } from "../../../../firebase";
import { serverTimestamp, doc, updateDoc, arrayRemove, arrayUnion } from "firebase/firestore";
import { storageRef } from "../../../../firebase";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { ComposeCarousel } from "../Compose-Carousel";
import { deleteObject, ref } from "firebase/storage";

export const EditPost = (props) => {

    const {
        authState,
        navigate, 
        storage, 
        upload, 
        getDownloadUrl, 
        uploadResumable, 
        posts, 
        setIsLoadingImg
    } = useContext(AppContext);
    
    const {
        photos, 
        setValidated,
        setInProgress,
        imageCompression,
    } = useContext(ComposeContext)
    
    const post = props.post;
    const [show, setShow] = useState(false);

    const toggleModal = () => {
        setShow(!show);             
    };

    const handleEdit = async (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation();
        }
        else{
            await Edit(post.postId, event);
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
                            const photoDirectory = `images/${authState.uid}/${post.postId}/${photo.name}`;
                            const photoRef = storageRef(storage, photoDirectory);
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