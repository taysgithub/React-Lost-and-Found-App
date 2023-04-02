import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { auth } from '../../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

import "./Top-Bar.scss";
import { Navigation } from './Navigation/Navigation';


export const TopBar = () => {
    const [authState] = useAuthState(auth);
    // console.log(authState);
    return (
        <div className="navbar">
            <Navbar bg="dark" variant="dark">
                <Container className='navbar-container'>
                    <Navigation />
                    <Navbar.Brand href="#home">Lost & Found</Navbar.Brand>
                    <Nav className="me-auto"></Nav>
                    <div className="right">
                        {authState &&
                            authState.email
                        }
                    </div>
                </Container>
            </Navbar>
        </div>
    )    
}