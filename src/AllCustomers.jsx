import React, { useEffect } from 'react';
import "./AllCustomers.css"
import Header from './Header';
import { Col, Container,Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
// import Row from 'react-bootstrap';
import { useState } from 'react';

const AllCustomers = () => {


    const [data, setData] = useState([])

    useEffect(()=>{
            fetch("http://localhost:4444/user/allcustomers",{
                method:"GET",
                credentials:"include",
                headers:{
                    "Content-Type":"application/json"
                }
            })
            .then(response=>response.json())
            .then(data=>setData(data))
            .catch(err=>console.error(err))
    },[])


    return (
        <>
            <Header x="admin"/>


            <Container fluid>
                <Row className='main-content1'>
                    <Col md className='col1'>
                    
                    <h3>Batman Inc.</h3>
                    <p>Sign up Bio written here</p>
                    </Col>
                    {/* <div class="vl"></div> */}
                    <Col md className='col1'>
                    
                    <h3>Product Name</h3>
                    <p>Sign up Bio written here</p>
                    </Col>
                    {/* <div class="vl"></div> */}
                    <Col md className='col1'>
                    
                    <div class="d-flex">
                        <h6>Advertising Category:&nbsp;</h6><p>Sanjay</p>
                    </div>
                    <div class="d-flex">
                        <h6>Online/Offline:&nbsp;</h6><p>Sanjay</p>
                    </div>
                        <div class="d-flex">
                        <h6>Specializations:&nbsp;</h6><p>Sanjay</p>
                    </div>
                        <div class="d-flex">
                        <h6>Social Media/Offline Accounts:&nbsp;</h6><p>Sanjay</p>
                    </div>
                    <div className='d-flex'>
                        <Button>WishList</Button>
                    </div>
                    </Col>
                </Row>
            </Container>
            
        </>
    );
}

export default AllCustomers;
