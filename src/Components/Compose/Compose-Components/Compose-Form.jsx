// React
import { useEffect } from 'react';
// Bootstrap
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
// Scss
import "./Compose-Form.scss";
// Hook
import useAuth from "../../../Hook/useAuth";
import useCompose from "../../../Hook/useCompose";

export const ComposeForm = (props) => {

    const post = props.post;
    // const validated = props.validated;

    const {
        user,
    } = useAuth();

    const {
        photos, 
        setPhotos,
        setLocalUrls,
        validated, 
        inProgress, 
        returnSpinner,
        isNewPost
    } = useCompose();

    const requestPhotoLocalUrls = (event) => {
        if(!event.target.files || event.target.files.length === 0){
            setPhotos([]);
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

    useEffect(() => {
        catchPhotoLocalUrls();
    }, [photos]);
    
    return (
        <div className="form">
            <Form  noValidate validated={validated} onSubmit={props.fn}>
                <Row>
                    <Form.Group as={Col} controlId="validationName">
                        <FloatingLabel
                            controlId="floatingName"
                            label="Name"
                            className="mb-3"
                        >
                            <Form.Control
                                required
                                type="text"
                                placeholder="Name"
                                defaultValue={ isNewPost ? '' : post.name }
                            />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </FloatingLabel>
                    </Form.Group>
                </Row>
                <Row>
                    <Form.Group as={Col} controlId="validationName">
                        <FloatingLabel
                            controlId="floatingEmail"
                            label="Email Address"
                            className="mb-3"
                        >
                            <Form.Control
                                required
                                type="email"
                                placeholder="Email Address"
                                defaultValue={ isNewPost ? user?.email : post.email}
                            />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </FloatingLabel>
                    </Form.Group>
                </Row>
                <Row>
                    <Form.Group as={Col} controlId="validationName">
                        <FloatingLabel
                            controlId="floatingPhone"
                            label="Phone"
                            className="mb-3"
                        >
                            <Form.Control
                                required
                                type="tel"
                                placeholder="Phone"
                                defaultValue={ isNewPost ? '' : post.phone}
                            />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </FloatingLabel>
                    </Form.Group>
                </Row>
                <Row>
                    <Form.Group as={Col} controlId="validationDescription">
                        <FloatingLabel
                            controlId="floatingDescription"
                            label="Description"
                            className="mb-3"
                        >
                        <Form.Label></Form.Label>
                        <Form.Control
                            required
                            as="textarea"
                            type="text"
                            placeholder="Description"
                            style={{ height: '200px' }}
                            defaultValue={ isNewPost ? '' : post.description}
                        />
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </FloatingLabel>
                    </Form.Group>                            
                </Row>
                <Row>
                    <Form.Group controlId="formFileMultiple" className="mb-3">
                            <Form.Control type="file" multiple accept="image/*" onChange={requestPhotoLocalUrls}/>
                    </Form.Group>
                </Row>
                <div className='compose-button'>
                    <Button variant="dark" type="submit" disabled={inProgress}>
                        {inProgress ? returnSpinner() : isNewPost ? 'Post' : 'Modify'}
                    </Button>
                </div>
            </Form>
        </div>
    )
}