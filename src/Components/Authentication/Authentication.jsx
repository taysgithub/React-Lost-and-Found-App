import { useState, useRef, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import "./Authentication.scss";
import { AppContext } from '../../App';

// Firebase
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

export const Authentication = (prop) => {

    const { auth, navigate} = useContext(AppContext);
    const [isSignUp, setIsSignUp] = useState(true);
    const [isSignIn, setIsSignIn] = useState(false);
    const email = useRef();
    const password = useRef();

    const toggleMode = () => {
        setIsSignUp(!isSignUp);
        setIsSignIn(!isSignIn);
    }

    const signUp = () => {
        createUserWithEmailAndPassword(auth, email.current.value, password.current.value).then(
            userCredential => {
                navigate(`/${prop.location}`);
            }
        ).catch (e => {
            alert(`${e.code}: ${e.message}`);
        });
    }

    const signIn = () => {        
        signInWithEmailAndPassword(auth, email.current.value, password.current.value).then(
            userCredential => {
                navigate(`/${prop.location}`);

            }
        ).catch(e => {
            alert(`${e.code}: ${e.message}`);
        })
    }

    const submit = (event) => {
        event.preventDefault();
        if(isSignUp){
            signUp();
        }
        else{
            signIn();
        }
        console.log({
            email: email,
            password: password
        })
    }

    return (
        <div className="authentication">
            <Form onSubmit={submit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Control type="email" placeholder="Email" ref={email} autoFocus/>
                </Form.Group>
        
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Control type="password" placeholder="Password" ref={password}/>
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