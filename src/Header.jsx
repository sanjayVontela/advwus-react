import React from 'react';
import { Navbar, NavItem, NavLink} from 'react-bootstrap';
import {Container} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVideoSlash } from '@fortawesome/free-solid-svg-icons';
import { Nav,Button } from 'react-bootstrap';
import { Dropdown } from 'react-bootstrap';
import { faMessage,faBell } from '@fortawesome/free-solid-svg-icons';


function Admin() {

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
      <Dropdown.Toggle variant='dark' id="dropdown-basic">User</Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item href="/profile" className='drop-item'>Profile</Dropdown.Item>
        <Dropdown.Item href="#/action-2" className='drop-item'>Reach Analysis</Dropdown.Item>
        <Dropdown.Item href="#/action-3" className='drop-item'>Likes/Other</Dropdown.Item>
        <Dropdown.Item href="#/action-3" className='drop-item'>Settings</Dropdown.Item>
        <Dropdown.Divider/>
        <Dropdown.Item href="#/action-3" className='drop-item'>Logout</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
            </Navbar.Collapse>
        </Container>

            </Navbar>


        </>
    );
    
}

function Customer(){

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
                <Nav.Link className="nav-link" href="/customer">Home</Nav.Link>
                <Nav.Link className="nav-link" href="/producers">Products</Nav.Link>
                <Nav.Link className="nav-link" href="/watchList">All Deals</Nav.Link>
                

            </Nav>

            <Button variant='dark'><FontAwesomeIcon icon={faMessage}/></Button>
            <Button variant='dark'><FontAwesomeIcon icon={faBell}/></Button>
            <Dropdown align='end'>
      <Dropdown.Toggle variant='dark' id="dropdown-basic">User</Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item href="/profile" className='drop-item'>Profile</Dropdown.Item>
        <Dropdown.Item href="#/action-2" className='drop-item'>Status/Reach</Dropdown.Item>
        <Dropdown.Item href="#/action-3" className='drop-item'>Likes/Other</Dropdown.Item>
        <Dropdown.Item href="#/action-3" className='drop-item'>Settings</Dropdown.Item>
        <Dropdown.Divider/>
        <Dropdown.Item href="#/action-3" className='drop-item'>Logout</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
            </Navbar.Collapse>
        </Container>

            </Navbar>


        </>
    );

}

function Producer(){
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
                <Nav.Link className="nav-link" href="/producer">Home</Nav.Link>
                <Nav.Link className="nav-link" href="/customers">Consumers</Nav.Link>
                <Nav.Link className="nav-link" href="/watchList">All Products</Nav.Link>
                <Nav.Link className="nav-link" href="/watchList">Add Product</Nav.Link>
                <Nav.Link className="nav-link" href="/watchList">All Deals</Nav.Link>
            </Nav>

            <Button variant='dark'><FontAwesomeIcon icon={faMessage}/></Button>
            <Button variant='dark'><FontAwesomeIcon icon={faBell}/></Button>
            <Dropdown align='end'>
      <Dropdown.Toggle variant='dark' id="dropdown-basic">User</Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item href="/profile" className='drop-item'>Profile</Dropdown.Item>
        <Dropdown.Item href="#/action-2" className='drop-item'>Status/Reach</Dropdown.Item>
        <Dropdown.Item href="#/action-3" className='drop-item'>Likes/Other</Dropdown.Item>
        <Dropdown.Item href="#/action-3" className='drop-item'>Settings</Dropdown.Item>
        <Dropdown.Divider/>
        <Dropdown.Item href="#/action-3" className='drop-item'>Logout</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
            </Navbar.Collapse>
        </Container>

            </Navbar>


        </>
    );

}

const Header = (props) => {

    if(props.x === "admin"){
        return <Admin />
    }
    if(props.x === "customer"){
        return <Customer />
    }
    if(props.x === "producer"){
        return <Producer />
    }
    
}

export default Header;
