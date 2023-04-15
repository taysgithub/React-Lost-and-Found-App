// React
import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
// Bootstrap
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Badge from 'react-bootstrap/Badge';
import {GiHamburgerMenu} from "react-icons/gi";
// Scss
import "./Navigation.scss";
// Hook
import usePosts from '../../../Hook/usePosts';
import useAuth from '../../../Hook/useAuth';

export const Navigation = () => {

    const {
        user,
        sign_out,
    } = useAuth();

    const {posts} = usePosts();
    const [show, setShow] = useState(false);
    const [numMyPosts, setNumMyPosts] = useState(0);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const calc_numMyPosts = () => {
        if(user){
            let counter = 0;
            posts?.forEach(post => {
                if(post.userId === user.uid){
                    counter += 1;
                }
            })
            setNumMyPosts(counter);
        }
    }

    useEffect(() => {
        calc_numMyPosts();
    }, [posts, user]);

    return (
        <div>
            <Button variant="link" onClick={handleShow}>
                <GiHamburgerMenu className='headerIcon'/>
            </Button>

            <Offcanvas show={show} onHide={handleClose} className="navigation">
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title className='offcanvas-title'>
                        Menu
                    </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body className='offcanvasBody'>
                    <Nav justify variant="pills" defaultActiveKey="/" className='options'>
                            <Nav.Item>
                                <Nav.Link as={Link} to="/" onClick={handleClose} className='option'>Home</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link as={Link} to="compose" onClick={handleClose} className='option'>Compose</Nav.Link>
                            </Nav.Item>
                            {!user &&
                                <Nav.Item>
                                    <Nav.Link as={Link} to="auth" onClick={handleClose} className='option'>Sign Up / Sign In</Nav.Link>
                                </Nav.Item>
                            }
                            { user &&
                                <div className="isSignedIn">
                                    <Nav.Item>
                                        <Nav.Link as={Link} to="myposts" onClick={handleClose} className='option' id='myposts-navlink'>
                                            My Posts
                                            <Badge pill bg="success">{numMyPosts}</Badge>
                                        </Nav.Link>  
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link as={Link} to="/" onClick={() => {handleClose(); sign_out()}} className='option'>Sign Out</Nav.Link>
                                    </Nav.Item>
                                </div>
                            }
                    </Nav>
                </Offcanvas.Body>
            </Offcanvas>
        </div>
    )
}