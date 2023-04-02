import "./NewPost.scss";
import { ComposeForm } from "../Compose-Form";
import { useContext } from "react";
import { AppContext } from "../../../../App";
import { ComposeContext } from "../../Compose";
import { db } from "../../../../firebase";
import { collection, addDoc, serverTimestamp, doc, updateDoc, arrayUnion } from "firebase/firestore";
import { storageRef } from "../../../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { ComposeCarousel } from "../Compose-Carousel";


export const NewPost = () => {
    const {auth, navigate, storage, upload,  getDownloadUrl, uploadResumable} = useContext(AppContext);
    const {
        photos, 
        setValidated,
        setInProgress,
        imageCompression,
    } = useContext(ComposeContext)
    const [authState] = useAuthState(auth);


    const handleNewPost = async (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation();
        }
        else{
            await addDocToFirestore(event);
            navigate('/myposts');           
        }
        setValidated(true);
    };

    const addDocToFirestore = async (e) => {
        setInProgress(true);
        const form = {
            userId: authState.uid,
            name : e.target[0].value,
            email: e.target[1].value,
            phone: e.target[2].value,
            description: e.target[3].value,
            photoUrls: [],
            photoDirectories: [],
            timestamp: serverTimestamp()
        }
        const docRef = await addDoc(collection(db, "posts"),form);
        console.log(docRef.id);
        if(photos.length !== 0){
            const updateRef = doc(db, "posts", docRef.id);
            // const metadata = { contentType: 'image/jpeg' };
            const options = {
                maxSizeMB: 1,
                maxWidthOrHeight: 466,
                useWebWorker: true,
            }
            
            for (const photo of photos){
                const photoDirectory = `images/${authState.uid}/${docRef.id}/${photo.name}`;
                const photoRef = storageRef(storage, photoDirectory);
                const compressedPhoto = await imageCompression(photo, options);
                const uploadTask = uploadResumable(photoRef, compressedPhoto/*, metadata*/);
                await upload(photoRef, compressedPhoto).then(async () => {
                    console.log(uploadTask.snapshot);
                    await getDownloadUrl(uploadTask.snapshot.ref).then(async (downloadURL) => {
                        // form.photoUrls = form.photoUrls.push(downloadURL);
                        // form.photoUrls = [...form.photoUrls, downloadURL];
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
        // await addDoc(collection(db, "posts"),form);
        setInProgress(false);
    }

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