// Bootstrap
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Carousel from 'react-bootstrap/Carousel';
// React
import { useState } from 'react';
// Scss
import "./Details.scss";

export const Details = (props) => {
    const [show, setShow] = useState(false);

    const toggleModal = () => {
        setShow(!show);             
    };

    return (
        <div className="details">
            <Button variant="dark" size="sm" className="smallBtn" onClick={toggleModal}>
                Details
            </Button>
            <Modal
                show={show}
                onHide={toggleModal}
                keyboard={false}
                centered
                scrollable
            >
                <Modal.Header className='modal-header' closeButton>
                    <Modal.Title className='modal-title'>Details</Modal.Title>
                </Modal.Header>
                <Modal.Body className='modal-body'>
                    <div className='detail-carousel'>
                        { props.photoUrls.length !== 0 &&
                            <Carousel variant="dark">
                                {props.photoUrls.map((photoUrl, index) => (
                                    <Carousel.Item key={index}>
                                        <img
                                        className='d-block w-100'
                                        src={photoUrl}
                                        alt={`${index} slide`}
                                        width={326}
                                        height={326}
                                        />
                                    </Carousel.Item>
                                ))}
                            </Carousel>
                        }
                    </div>
                    <div><b>Name: </b>{props.name}</div>
                    <div><b>Email: </b><a href={`mailto:${props.email}`}>{props.email}</a></div>
                    <div><b>Phone: </b><a href={`tel:${props.phone}`}>{props.phone}</a></div>
                    <div><b>Description:</b></div>
                    <div className='details-detail'>{props.description}</div>
                </Modal.Body>
            </Modal>
        </div>
    )
}