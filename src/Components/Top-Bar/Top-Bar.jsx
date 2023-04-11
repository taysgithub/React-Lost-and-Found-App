import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { auth } from '../../firebase';

import "./Top-Bar.scss";
import { Navigation } from './Navigation/Navigation';

// Hook
import useAuth from '../../Hook/useAuth';

export const TopBar = () => {
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
    // console.log(authState);
    return (
        <div className="navbar">
            <Navbar bg="dark" variant="dark">
                <Container className='navbar-container'>
                    <Navigation />
                    <Navbar.Brand href="/">Lost & Found</Navbar.Brand>
                    <Nav className="me-auto"></Nav>
                    <div className="right">
                        {user &&
                            user.email
                        }
                    </div>
                </Container>
            </Navbar>
        </div>
    )    
}