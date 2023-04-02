import "./Delete.scss";
import { useState, useContext } from "react";
import { AppContext } from "../../../../App";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { db } from "../../../../firebase";
import { deleteDoc, doc } from "firebase/firestore";
import { deleteObject, ref, listAll } from "firebase/storage";
import { useAuthState } from "react-firebase-hooks/auth";

export const Delete = (props) => {
    const {auth, storage} = useContext(AppContext);
    const [show, setShow] = useState(false);
    const [authState] = useAuthState(auth);

    const toggleModal = () => {
        setShow(!show);             
    };

    const deletePost = async (id) => {
        const path = `images/${authState.uid}/${id}`;
        const listAllRef = ref(storage, path);        
        try {
            await listAll(listAllRef).then( response => {
                response.items.forEach( async item => {
                    await deleteObject(item)
                })
            })
            await deleteDoc(doc(db, "posts", id));
            toggleModal();
        } catch(err){
            alert("Error, please try again.");
            console.log(err);
        }
    }

    return (
        <div className="delete">
            <Button variant="dark" size="sm" className="smallBtn" onClick={toggleModal}>
                Delete
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
                    <Modal.Title>Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Do you confirm to delete?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" size="sm" className="smallBtn" onClick={() => {deletePost(props.postId)}}>
                        Delete
                    </Button>
                    <Button variant="dark" size="sm" className="smallBtn" onClick={toggleModal}>
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}