// Bootstrap
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import FloatingLabel from 'react-bootstrap/FloatingLabel';

// Hook
import useAuth from "../../../Hook/useAuth";
import useCompose from "../../../Hook/useCompose";

export const ComposeForm = (props) => {

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
        post,
        isNewPost
    } = useCompose();
    
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
                                autoFocus={true}
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
                <Button variant="dark" type="submit" disabled={inProgress}>
                    {inProgress ? returnSpinner() : isNewPost ? 'Post' : 'Modify'}
                </Button>
            </Form>
        </div>
    )
}