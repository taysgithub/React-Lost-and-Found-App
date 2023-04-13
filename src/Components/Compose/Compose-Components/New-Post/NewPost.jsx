// Scss
import "./NewPost.scss";
// Bootstrap
import { ComposeForm } from "../Compose-Form";
// Components
import { ComposeCarousel } from "../Compose-Carousel";
// Firebase
import { db, storage, upload,  getDownloadUrl, uploadResumable } from "../../../../firebase";
import { collection, addDoc, serverTimestamp, doc, updateDoc, arrayUnion } from "firebase/firestore";
import { ref } from "firebase/storage";
// Hook
import useApp from "../../../../Hook/useApp";
import useAuth from "../../../../Hook/useAuth";
import useCompose from "../../../../Hook/useCompose";
import { useEffect, useLayoutEffect } from "react";

export const NewPost = () => {
    const {
        user,
    } = useAuth();

    const {
        navigate, 
    } = useApp();

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
        imageCompression,
    } = useCompose();

    const handleNewPost = async (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation();
        }
        else{
            await addDocToFirestore(event);
            form.reset();
            navigate('/myposts');           
        }
        setValidated(true);
    };

    const addDocToFirestore = async (e) => {
        setInProgress(true);
        const form = {
            userId: user.uid,
            name : e.target[0].value,
            email: e.target[1].value,
            phone: e.target[2].value,
            description: e.target[3].value,
            photoUrls: [],
            photoDirectories: [],
            timestamp: serverTimestamp()
        }
        const docRef = await addDoc(collection(db, "posts"),form);
        // console.log(docRef.id);
        if(photos.length !== 0){
            const updateRef = doc(db, "posts", docRef.id);
            const options = {
                maxSizeMB: 1,
                maxWidthOrHeight: 466,
                useWebWorker: true,
            }
            
            for (const photo of photos){
                const photoDirectory = `images/${user.uid}/${docRef.id}/${photo.name}`;
                const photoRef = ref(storage, photoDirectory);
                const compressedPhoto = await imageCompression(photo, options);
                const uploadTask = uploadResumable(photoRef, compressedPhoto);
                await upload(photoRef, compressedPhoto).then(async () => {
                    // console.log(uploadTask.snapshot);
                    await getDownloadUrl(uploadTask.snapshot.ref).then(async (downloadURL) => {
                        await updateDoc(updateRef, {
                            photoUrls: arrayUnion(downloadURL)
                        })
                    });
                    await updateDoc(updateRef, {
                        photoDirectories: arrayUnion(photoDirectory)
                    })
                })
            }
        }
        setInProgress(false);
    }

    useEffect(() => {
        setPhotos([]);
        setValidated(false);
    }, []);

    return (
        <div className="new-post">
            <h3>Compose</h3>
            <div className="compose-carousel">
                <ComposeCarousel />
            </div>
            <ComposeForm fn={handleNewPost}/>
        </div>
    )
}