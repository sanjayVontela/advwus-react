import React, { useEffect } from 'react';
import "./AllCustomers.css"
import Header from './Header';
import { Col, Container,Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
// import Row from 'react-bootstrap';
import { useState } from 'react';
import {NotificationContainer, NotificationManager} from 'react-notifications';

const Wishlist = () => {


    const [data, setData] = useState([])


    function removeWishlist(id){
        console.log(id);
        fetch(`http://localhost:4444/user/deleteWishlist/${id}`,{
            method:"DELETE",
            credentials:"include",
            headers:{
                "Content-Type":"application/json"
            }
        })
        .then(response=>response.json())
        .then(data=>{
            if(data.data){
                NotificationManager.success(data.message);
                setData(data.data)
                // console.log(data);
            }else{
                NotificationManager.error(data.error);
                // alert(data.error)
            }
        })
        .catch(err=>console.error(err))

    }


    useEffect(()=>{
            fetch("http://localhost:4444/user/allWishlist",{
                method:"GET",
                credentials:"include",
                headers:{
                    "Content-Type":"application/json"
                }
            })
            .then(response=>response.json())
            .then(data=>{
                if(data.data){
                    // console.log(data.data);
                    setData(data.data)
                }else{
                    alert(data.error)
                }
            })
            .catch(err=>console.error(err))
    },[])

    // console.log(data);

    return (
        <>
            <Header x="producer"/>


            <Container fluid>

                {data.map(d=>{
                    return (
                        <Row className='main-content1'>
                    <Col md className='col1'>
                    
                    <h3>{d.fname} {d.lname},{d.channelName}</h3>
                    {/* <h3>{d.channelName}</h3> */}
                    {/* <p>{d.channelDesc}</p> */}
                    <div>
                        <label className='l'>Advertisement Catrgory:</label>
                        <p className='p'>{d.how}</p>
                    </div>
                    <div>
                    <label className='l'>Where:</label>
                    <p className='p'>{d.where.join()}</p>
                    </div>
                        
                   
                    </Col>
                    {/* <div class="vl"></div> */}
                    
                    {/* <div class="vl"></div> */}
                    <Col md xs={12} className='col1'>
                    
                    <div>
                        <label className='l'>Youtube:</label>
                        <p className='p'>{d.youtube}</p>
                    </div>
                    <div>
                        <label className='l'>Instagram:</label>
                        <p className='p'>{d.insta}</p>
                    </div>
                    <div>
                        <label className='l'>Tiktok:</label>
                        <p className='p'>{d.tiktok}</p>
                    </div>
                    <div className='d-flex'>
                        <Button onClick={()=>removeWishlist(d.username)}>Remove</Button>
                    </div>
                    
                    </Col>
                    {/* <Col md className='col1'>
                    
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
                    </Col> */}
                </Row>

                    )
                })}
                
            </Container>
            <NotificationContainer/>
            
        </>
    );
}

export default Wishlist;
