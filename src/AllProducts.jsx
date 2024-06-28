import React from 'react';
import "./AllCustomers.css"
import Header from './Header';
import { Col, Container,Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
// import Row from 'react-bootstrap';

const AllProducts = () => {
    return (
        <>
            <Header x="admin"/>


            {/* <Container> */}
                <Row className='main-content1'>
                    <Col md xs={12} className='col1'>
                    
                    <h3>Batman Inc.</h3>
                    <p>Sign up Bio written here</p>
                    </Col>
                    <Col md xs={12} className='col1'>
                    
                    <h3>Product Name</h3>
                    <p>Sign up Bio written here</p>
                    </Col>
                    <Col md xs={12} className='col1'>
                    
                    <div class="d-flex">
                        <h6>Product Category:&nbsp;</h6><p>Sanjay</p>
                    </div>
                    <div class="d-flex">
                        <h6>Online/Offline:&nbsp;</h6><p>Sanjay</p>
                    </div>
                        <div class="d-flex">
                        <h6>Looking:&nbsp;</h6><p>Sanjay</p>
                    </div>
                        <div class="d-flex">
                        <h6>Budget:&nbsp;</h6><p>Sanjay</p>
                    </div>
                    <div className='d-flex'>
                        <Button>WishList</Button>
                    </div>
                    </Col>
                </Row>
            {/* </Container> */}
            
        </>
    );
}

export default AllProducts;
