import { useState, useContext, useEffect, createContext } from 'react';
import Modal from 'react-bootstrap/Modal';
import imageCompression from 'browser-image-compression';

import { Authentication } from '../Authentication/Authentication';
import "./Compose.scss";
import { NewPost } from './Compose-Components/New-Post/NewPost';
import { EditPost } from './Compose-Components/Edit-Post/Edit-Post';

// Hook
import useApp from '../../Hook/useApp';
import useAuth from '../../Hook/useAuth';
import useCompose from '../../Hook/useCompose';

export const ComposeContext = createContext();

export const Compose = (props) => {
    const {
        navigate,
    } = useApp();

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
        toggleMode
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
        requestPhotoLocalUrls,
        catchPhotoLocalUrls,
        returnSpinner,
        mode,
        setMode,
        post,
        setPost,
        isNewPost,
    } = useCompose();

    setMode(props.mode);
    setPost(props.post);

    const handleClose = () => {
        navigate('/');
    }

    return (
        <div className="compose">
            {!user && 
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
            {user &&
                isNewPost ? <NewPost/> : <EditPost />            
            }
        </div>
    )
}