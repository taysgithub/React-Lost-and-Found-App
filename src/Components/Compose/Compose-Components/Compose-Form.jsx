import { useContext } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { AppContext } from "../../../App";
import { ComposeContext } from "../Compose";

// Bootstrap
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export const ComposeForm = (props) => {
    const { auth } = useContext(AppContext);
    const [authState] = useAuthState(auth); 
    const {
        mode, 
        validated,
        inProgress,
        requestPhotoLocalUrls,
        returnSpinner,
    } = useContext(ComposeContext);
    const post = props.post;
    
    return (
        <div className="form">
            <Form  noValidate validated={validated} onSubmit={props.fn}>
                <Row>
                    <Form.Group as={Col} controlId="validationName">
                        <Form.Label></Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="Name"
                            defaultValue={ mode === "newPost" ? '' : post.name }
                            className='inputFields'
                        />
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>
                </Row>
                <Row>
                    <Form.Group as={Col} controlId="validationName">
                        <Form.Label></Form.Label>
                        <Form.Control
                            required
                            type="email"
                            placeholder="Email"
                            defaultValue={ mode === "newPost" ? authState?.email : post.email}
                        />
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>
                </Row>
                <Row>
                    <Form.Group as={Col} controlId="validationName">
                        <Form.Label></Form.Label>
                        <Form.Control
                            required
                            type="tel"
                            placeholder="Phone"
                            defaultValue={ mode === "newPost" ? '' : post.phone}
                        />
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>
                </Row>
                <Row>
                    <Form.Group as={Col} controlId="validationDescription">
                        <Form.Label></Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="Description"
                            defaultValue={ mode === "newPost" ? '' : post.description}
                        />
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>                            
                </Row>
                <Row>
                    <Form.Group controlId="formFileMultiple" className="mb-3">
                        <Form.Label></Form.Label>
                        <Form.Control type="file" multiple accept="image/*" onChange={requestPhotoLocalUrls}/>
                    </Form.Group>
                </Row>
                <Button variant="dark" type="submit" disabled={inProgress}>
                    {inProgress ? returnSpinner() : mode === "newPost" ? 'Post' : 'Modify'}
                </Button>
            </Form>
        </div>
    )
}