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
    const isNewPost = (mode === "newPost")

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
            returnSpinner,
            imageCompression,
            mode, 
            setMode,
            isNewPost,
        }}>
            {children}
        </ComposeContext.Provider>
    )
}