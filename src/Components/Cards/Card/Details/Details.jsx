import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Carousel from 'react-bootstrap/Carousel';
import { useState } from 'react';
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
                // backdrop="static"
                keyboard={false}
                centered
                scrollable
            >
                <Modal.Header closeButton>
                    <Modal.Title>Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='detail-carousel'>
                        <Carousel variant="dark">
                            { props.photoUrls &&
                                props.photoUrls.map((photoUrl, index) => (
                                    <Carousel.Item key={index}>
                                        <img
                                        // className="details-imgs"
                                        className='d-block w-100'
                                        src={photoUrl}
                                        alt={`${index} slide`}
                                        width={326}
                                        height={326}
                                        />
                                        {/* <Carousel.Caption>
                                        <h3>First slide label</h3>
                                        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                                        </Carousel.Caption> */}
                                    </Carousel.Item>
                                ))
                            }
                        </Carousel>
                    </div>
                    <div><b>Name: </b>{props.name}</div>
                    <div><b>Email: </b><a href={`mailto:${props.email}`}>{props.email}</a></div>
                    <div><b>Phone: </b><a href={`tel:${props.phone}`}>{props.phone}</a></div>
                    <div><b>Description:</b></div>
                    <div className='details-detail'>{props.description}</div>
                </Modal.Body>
                <Modal.Footer>
                </Modal.Footer>
            </Modal>
        </div>
    )
}