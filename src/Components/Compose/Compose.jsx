import { useState, useContext, useEffect, createContext } from 'react';
import Modal from 'react-bootstrap/Modal';
import Spinner from 'react-bootstrap/Spinner';
import imageCompression from 'browser-image-compression';

import { AppContext } from '../../App';
import { Authentication } from '../Authentication/Authentication';
import "./Compose.scss";
import { NewPost } from './Compose-Components/New-Post/NewPost';
import { EditPost } from './Compose-Components/Edit-Post/Edit-Post';

export const ComposeContext = createContext();

export const Compose = (props) => {
    const {navigate, authState} = useContext(AppContext);
    const mode = props.mode;
    const isNewPost = (mode === "newPost")
    const post = props.post;
    const [validated, setValidated] = useState(false);
    const [photos, setPhotos] = useState([]);
    const [localUrls, setLocalUrls] = useState([]);
    const [inProgress, setInProgress] = useState(false);

    const handleClose = () => {
        navigate('/');
    }

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

    return (
        <div className="compose">
            {!authState && 
                <div className="modal">
                    <Modal
                        show={true}
                        onHide={handleClose}
                        backdrop="static"
                        keyboard={false}
                        centered
                    >
                        <Modal.Header closeButton>
                        <Modal.Title>Authentication</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Authentication location='compose'/>
                        </Modal.Body>
                    </Modal>

                </div>
            }
            {authState &&
                <ComposeContext.Provider 
                    value={{
                        mode, 
                        photos, 
                        localUrls,
                        validated,
                        inProgress,
                        setInProgress,
                        returnSpinner, 
                        requestPhotoLocalUrls, 
                        setValidated,
                        setInProgress,
                        setLocalUrls,
                        imageCompression,
                    }}
                >
                    { isNewPost ? <NewPost/> : <EditPost post={post}/>}             
                </ComposeContext.Provider>
            }
        </div>
    )
}