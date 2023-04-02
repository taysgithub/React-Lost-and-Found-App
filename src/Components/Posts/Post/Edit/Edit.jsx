import "./Edit.scss";
import { useState } from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { Compose } from "../../../Compose/Compose";

export const Edit = (props) => {

    const [show, setShow] = useState(false);

    const toggleModal = () => {
        setShow(!show);             
    };

    return (
        <div className="edit">
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
                    < Compose 
                        edit={true}
                        name={props.name}
                        description={props.description}
                        email={props.email}
                        phone={props.phone}
                        postId={props.postId}
                        setShow={setShow}
                    />
                </Modal.Body>
                <Modal.Footer></Modal.Footer>
            </Modal>
        </div>
    )
}