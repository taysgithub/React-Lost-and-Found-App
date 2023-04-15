// React
import { createContext } from 'react';
// Bootstrap
import Modal from 'react-bootstrap/Modal';
// Component
import { Authentication } from '../Authentication/Authentication';
import { NewPost } from './Compose-Components/New-Post/NewPost';
import { EditPost } from './Compose-Components/Edit-Post/Edit-Post';
// Scss
import "./Compose.scss";
// Hook
import useApp from '../../Hook/useApp';
import useAuth from '../../Hook/useAuth';
import useCompose from '../../Hook/useCompose';

export const ComposeContext = createContext();

export const Compose = (props) => {

    const post = props.post;

    const {
        navigate,
    } = useApp();

    const {
        user,
    } = useAuth();

    const {
        setMode,
        isNewPost,
    } = useCompose();

    setMode(props.mode);

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
                isNewPost ? <NewPost/> : <EditPost post={post}/>            
            }
        </div>
    )
}