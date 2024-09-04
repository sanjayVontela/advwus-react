import React, { useEffect, useState } from 'react';
import { Navbar, NavItem, NavLink} from 'react-bootstrap';
import {Container} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVideoSlash } from '@fortawesome/free-solid-svg-icons';
import { Nav,Button } from 'react-bootstrap';
import { Dropdown } from 'react-bootstrap';
import { faMessage,faBell } from '@fortawesome/free-solid-svg-icons';
import { faBars,faClose } from '@fortawesome/free-solid-svg-icons';
import { AuthState } from './AuthContext';
import { useNavigate } from 'react-router-dom';
import Badge from '@mui/material/Badge';
// const { userId, setUserId,notification,setNotification } = AuthState();
import NotificationBadge from 'react-notification-badge';
import {Effect} from 'react-notification-badge';
function Admin({fname}) {

    

    return (
        <>

            <Navbar bg="dark" variant="dark" expand="lg" style={{marginTop:"0%"}}>
            <Container fluid>
            <Navbar.Brand href="/" style={{"color":"green"}}>
                <FontAwesomeIcon icon={faVideoSlash} />Advwus
            </Navbar.Brand>
            <Navbar.Toggle aria-controlls="navbar-scroll" />
            <Navbar.Collapse id="navbarScroll">
            <Nav className="me-auto my-2 my-lg-0" style={{maxHeight:'100px'}} navbarScroll>
                <Nav.Link className="nav-link" href="/sanjay">Home</Nav.Link>
                <Nav.Link className="nav-link" href="/watchList">About us</Nav.Link>
                <Nav.Link className="nav-link" href="/watchList">Producer</Nav.Link>
                <Nav.Link className="nav-link" href="/watchList">Consumer</Nav.Link>
                <Nav.Link className="nav-link" href="/watchList">All Products</Nav.Link>
                

            </Nav>

            <Button variant='dark'><FontAwesomeIcon icon={faMessage}/></Button>
            <Button variant='dark'><FontAwesomeIcon icon={faBell}/></Button>
            <Dropdown align='end'>
      <Dropdown.Toggle variant='dark' id="dropdown-basic">{fname}</Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item href="/profile" className='drop-item'>Profile</Dropdown.Item>
        <Dropdown.Item href="#/action-2" className='drop-item'>Reach Analysis</Dropdown.Item>
        <Dropdown.Item href="#/action-3" className='drop-item'>Likes/Other</Dropdown.Item>
        <Dropdown.Item href="#/action-3" className='drop-item'>Settings</Dropdown.Item>
        <Dropdown.Divider/>
        <Dropdown.Item href="/logout" className='drop-item'>Logout</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
            </Navbar.Collapse>
        </Container>

            </Navbar>


        </>
    );
    
}

function Customer({fname}){
    const { userId, setUserId,notification,setNotification } = AuthState();
    const navigate = useNavigate();
    return (
        <>

            <Navbar bg="dark" variant="dark" expand="lg" style={{marginTop:"0%"}}>
            <Container fluid>
            <Navbar.Brand href="/producers" style={{"color":"green"}}>
                <FontAwesomeIcon icon={faVideoSlash} />Advwus
            </Navbar.Brand>
            <Navbar.Toggle aria-controlls="navbar-scroll" />
            <Navbar.Collapse id="navbarScroll">
            <Nav className="me-auto my-2 my-lg-0" style={{maxHeight:'100px'}} navbarScroll>
                <Nav.Link className="nav-link" href="/producers">Home</Nav.Link>
                <Nav.Link className="nav-link" href="/watchList">All Deals</Nav.Link>

                

            </Nav>

            <Button variant='dark' onClick={()=>navigate("/chat")}> <NotificationBadge count={notification.length} effect={Effect.SCALE} /><FontAwesomeIcon icon={faMessage}/></Button>
            
            {/* <Button variant='dark'><FontAwesomeIcon icon={faBell}/></Button> */}
            <Dropdown align='end'>
            <Dropdown.Toggle variant='dark' id="dropdown-basic"><FontAwesomeIcon icon={faBell}/></Dropdown.Toggle>

                <Dropdown.Menu>
                <Dropdown.Item  className='drop-item'>{!notification.length && 'No new messages'}</Dropdown.Item>
                {notification.map(n=>{
                    return(
                        <Dropdown.Item  className='drop-item'>{`New Notification from ${n.name}`}</Dropdown.Item>
                    )
                })}
                
                </Dropdown.Menu>
                            </Dropdown>

            
            <Dropdown align='end'>
      <Dropdown.Toggle variant='dark' id="dropdown-basic">{fname}</Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item href="/profile" className='drop-item'>Profile</Dropdown.Item>
        <Dropdown.Item href="#/action-2" className='drop-item'>Status/Reach</Dropdown.Item>
        <Dropdown.Item href="#/action-3" className='drop-item'>Likes/Other</Dropdown.Item>
        <Dropdown.Item href="#/action-3" className='drop-item'>Settings</Dropdown.Item>
        <Dropdown.Divider/>
        <Dropdown.Item href="/logout" className='drop-item'>Logout</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
            </Navbar.Collapse>
        </Container>

            </Navbar>


        </>
    );

}

function Producer({fname}){
    const { userId, setUserId,notification,setNotification } = AuthState();
    const navigate = useNavigate();
    return (
        <>

            <Navbar bg="dark" variant="dark" expand="lg" style={{marginTop:"0%"}}>
            <Container fluid>
            <Navbar.Brand href="/customers" style={{"color":"green"}}>
                <FontAwesomeIcon icon={faVideoSlash} />Advwus
            </Navbar.Brand>
            <Navbar.Toggle aria-controlls="navbar-scroll" />
            <Navbar.Collapse id="navbarScroll">
            <Nav className="me-auto my-2 my-lg-0" style={{maxHeight:'100px'}} navbarScroll>
                <Nav.Link className="nav-link" href="/customers">Home</Nav.Link>
                <Nav.Link className="nav-link" href="/ownProducts">All Products</Nav.Link>
                <Nav.Link className="nav-link" href="/addProduct">Add Product</Nav.Link>
                <Nav.Link className="nav-link" href="/wishlist">Wishlist</Nav.Link>
                <Nav.Link className="nav-link" href="/watchList">All Deals</Nav.Link>
            </Nav>

            <Button variant='dark' onClick={()=>navigate("/chat")}><FontAwesomeIcon icon={faMessage}/></Button>
            <Dropdown align='end'>
            <Dropdown.Toggle variant='dark' id="dropdown-basic"><NotificationBadge count={notification.length} effect={Effect.SCALE} /><FontAwesomeIcon icon={faBell}/></Dropdown.Toggle>

                <Dropdown.Menu>
                <Dropdown.Item  className='drop-item'>{!notification.length && 'No new messages'}</Dropdown.Item>
                {notification.map(n=>{
                    return(
                        <Dropdown.Item href={`/chat/${n.sender}`}  className='drop-item'>{`New Message from ${n.name}`}</Dropdown.Item>
                    )
                })}
                
                </Dropdown.Menu>
                            </Dropdown>
            <Dropdown align='end'>
      <Dropdown.Toggle variant='dark' id="dropdown-basic">{fname}</Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item href="/profile" className='drop-item'>Profile</Dropdown.Item>
        <Dropdown.Item href="#/action-2" className='drop-item'>Status/Reach</Dropdown.Item>
        <Dropdown.Item href="#/action-3" className='drop-item'>Likes/Other</Dropdown.Item>
        <Dropdown.Item href="#/action-3" className='drop-item'>Settings</Dropdown.Item>
        <Dropdown.Divider/>
        <Dropdown.Item href="/logout" className='drop-item'>Logout</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
            </Navbar.Collapse>
        </Container>

            </Navbar>


        </>
    );

}

const Header = (props) => {

    const [fname, setFname] = useState("");
    useEffect(()=>{

      setFname(localStorage.getItem("fname"))
      

    })

    if(props.x === "admin"){
        return <Admin fname={fname} />
    }
    if(props.x === "consumer"){
        return <Customer fname={fname} />
    }
    if(props.x === "producer"){
        return <Producer fname={fname} />
    }
    
}

export default Header;
