import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Badge from 'react-bootstrap/Badge';
import {GiHamburgerMenu} from "react-icons/gi";
import { Link } from "react-router-dom";
import "./Navigation.scss";
import { useState, useContext, useEffect } from 'react';
import { signOut } from "firebase/auth";
import { AppContext } from '../../../App';

export const Navigation = () => {

    const {authState, auth, posts} = useContext(AppContext);
    const [show, setShow] = useState(false);
    const [numMyPosts, setNumMyPosts] = useState(0);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const sign_out = () => {
        signOut(auth).then(() => {
            // setUser(null);
            // alert("You are signed out");
        }).catch(e => {
            alert(`${e.code}: ${e.message}`);
        })
    }

    const calc_numMyPosts = () => {
        if(authState){
            let counter = 0;
            posts?.forEach(post => {
                if(post.userId === authState.uid){
                    counter += 1;
                }
            })
            setNumMyPosts(counter);
        }
    }

    useEffect(() => {
        calc_numMyPosts();
    }, [posts]);

    return (
        <div>
            <Button variant="link" onClick={handleShow}>
                <GiHamburgerMenu className='headerIcon'/>
            </Button>

            <Offcanvas show={show} onHide={handleClose} className="navigation">
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>
                        Menu
                    </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body className='offcanvasBody'>
                    <Nav justify variant="pills" defaultActiveKey="/" className='options'>
                            <Nav.Item>
                                <Nav.Link as={Link} to="/" onClick={handleClose} className='option'>Home</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link as={Link} to="/compose" onClick={handleClose} className='option'>Compose</Nav.Link>
                            </Nav.Item>
                            {!authState &&
                                <Nav.Item>
                                    <Nav.Link as={Link} to="/auth" onClick={handleClose} className='option'>Sign Up / Sign In</Nav.Link>
                                </Nav.Item>
                            }
                            { authState &&
                                <div className="isSignedIn">
                                    <Nav.Item>
                                        <Nav.Link as={Link} to="/myposts" onClick={handleClose} className='option' id='myposts-navlink'>
                                            My Posts
                                            <Badge pill bg="dark">{numMyPosts}</Badge>
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