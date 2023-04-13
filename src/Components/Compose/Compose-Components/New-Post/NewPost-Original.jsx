import "./NewPost.scss";
import { ComposeForm } from "../Compose-Form";
import { db, storage, upload, getDownloadUrl, uploadResumable } from "../../../../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { ref } from "firebase/storage";
import { ComposeCarousel } from "../Compose-Carousel";

// Hook
import useApp from "../../../../Hook/useApp";
import useAuth from "../../../../Hook/useAuth";
import useCompose from "../../../../Hook/useCompose";

export const NewPost = () => {
    const {
        user,
        setUser,
        signUp,
        signIn,
        sign_out,
        isSignUp,
        setIsSignUp,
        isSignIn,
        setIsSignIn,
        toggleMode,
        isLoading
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
            timestamp: serverTimestamp()
        }
        if(photos.length !== 0){
            // const metadata = { contentType: 'image/jpeg' };
            const options = {
                maxSizeMB: 1,
                maxWidthOrHeight: 466,
                useWebWorker: true,
            }
            
            for (const photo of photos){
                const photoRef = ref(storage, `images/${user.uid}/${photo.name}`);
                const compressedPhoto = await imageCompression(photo, options);
                const uploadTask = uploadResumable(photoRef, compressedPhoto/*, metadata*/);
                await upload(photoRef, compressedPhoto).then(async snapshot => {
                    await getDownloadUrl(uploadTask.snapshot.ref).then((downloadURL) => {
                        // form.photoUrls = form.photoUrls.push(downloadURL);
                        form.photoUrls = [...form.photoUrls, downloadURL];
                    });
                })
            }
        }
        await addDoc(collection(db, "posts"),form);
        setInProgress(false);
    }

    return (
        <div className="new-post">
            <h3>Compose</h3>
            <ComposeCarousel />
            <ComposeForm fn={handleNewPost}/>
        </div>
    )
}