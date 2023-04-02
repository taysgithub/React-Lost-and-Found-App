import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import "./Top-Bar.scss";
import { Navigation } from './Navigation/Navigation';


export const TopBar = () => {
    return (
        <div className="navbar">
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navigation />
                    <Navbar.Brand href="#home">Lost & Found</Navbar.Brand>
                    <Nav className="me-auto">
                        {/* <Nav.Link href="#home">Home</Nav.Link>
                        <Nav.Link href="#features">Features</Nav.Link> */}
                        {/* <Nav.Link href="#pricing">Pricing</Nav.Link> */}
                    </Nav>
                </Container>
            </Navbar>
            {/* <Button variant="primary">Primary</Button> */}
        </div>
    )    
}