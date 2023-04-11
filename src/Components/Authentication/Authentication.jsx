// Bootstrap
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
// Scss
import "./Authentication.scss";
// Hook
import useAuth from '../../Hook/useAuth';

export const Authentication = (prop) => {

    const {
        signUp,
        signIn,
        isSignUp,
        isSignIn,
        toggleMode
    } = useAuth();

    const submit = (event) => {
        event.preventDefault();
        const email = event.target[0].value;
        const password = event.target[1].value;
        if(isSignUp){
            signUp(email, password);
        }
        else{
            signIn(email, password);
        }
    }

    return (
        <div className="authentication">
            <Form onSubmit={submit} className='auth-form'>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <FloatingLabel
                        controlId="floatingEmail"
                        label="Email address"
                        className="mb-3"
                    >
                        <Form.Control type="email" placeholder="Email" autoFocus={true}/>
                    </FloatingLabel>
                </Form.Group>
        
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <FloatingLabel
                        controlId="floatingPassword"
                        label="Password"
                        className="mb-3"
                    >
                        <Form.Control type="password" placeholder="Password"/>
                    </FloatingLabel>
                </Form.Group>

                {isSignUp &&
                    <div className="submitOrToggle">
                        <div className="btn-submit">
                            <Button variant="dark" size="sm" type="submit">
                                Sign Up
                            </Button>
                        </div>
                        <hr />
                        <div className='toggle-area'>
                            Have an account?
                            <Button variant="link" size="sm" onClick={toggleMode}>Sign In</Button>
                        </div>
                    </div>
                }
                {isSignIn &&
                    <div className="submitOrToggle">
                        <div className="btn-submit">
                            <Button variant="dark" size="sm" type="submit">
                                Sign In
                            </Button>
                        </div>
                        <hr />
                        <div className='toggle-area'>
                            Newcomer?
                            <Button variant="link" size="sm" onClick={toggleMode}>Sign Up</Button>
                        </div>
                    </div>
                }
            </Form>
        </div> 
    )
}