import { createContext, useContext, useState, useEffect } from "react";
import Spinner from 'react-bootstrap/Spinner';
import imageCompression from 'browser-image-compression';

export const ComposeContext = createContext();

export const ComposeProvider = ({children}) => {
    const [photos, setPhotos] = useState([]);
    const [localUrls, setLocalUrls] = useState([]);
    const [validated, setValidated] = useState(false);
    const [inProgress, setInProgress] = useState(false);
    const [mode, setMode] = useState("");
    const [post, setPost] = useState(null);
    const isNewPost = (mode === "newPost")


    const requestPhotoLocalUrls = (event) => {
        if(!event.target.files || event.target.files.length === 0){
            setPhotos(undefined);
            return;
        }
        else {
            // console.log(event.target.files);
            setPhotos(Array.from(event.target.files));
        }
    }
    const catchPhotoLocalUrls = () => {
        const tempArray = [];
        photos.forEach(photo => {tempArray.push(URL.createObjectURL(photo))});
        setLocalUrls(tempArray);
    }

    const returnSpinner = () => {
        return (
            <div className="spinner">
                <Spinner 
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                />
                Uploading...
            </div>
        )
    }

    useEffect(() => {
        catchPhotoLocalUrls();
    }, [photos]);

    return(
        <ComposeContext.Provider value={{
            photos, 
            setPhotos,
            localUrls, 
            setLocalUrls,
            validated, 
            setValidated,
            inProgress, 
            setInProgress,
            requestPhotoLocalUrls,
            catchPhotoLocalUrls,
            returnSpinner,
            imageCompression,
            mode, 
            setMode,
            post, 
            setPost,
            isNewPost,
        }}>
            {children}
        </ComposeContext.Provider>
    )
}