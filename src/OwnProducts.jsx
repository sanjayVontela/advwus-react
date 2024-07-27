import React, { useEffect, useState } from 'react';
import "./OwnProducts.css"
import Header from './Header';
import { Col, Container,Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import { useNavigate } from 'react-router-dom';

const AllProducts = () => {

    const [data,setData] = useState([])

    const navigate = useNavigate();
    useEffect(()=>{

        fetch("http://localhost:4444/user/ownProducts",{
            method:"GET",
            credentials:'include',
            headers:{
            'Content-Type':'application/json',
            },
        })
        .then(response=>response.json())
        .then(data=>setData(data.data))
        .catch  (error=>console.error(error))
    },[])
    console.log(data);
    
    function deleteItem(itemId){
        console.log(itemId);

        fetch(`http://localhost:4444/user/deleteItem/${itemId}`,{
            method:"DELETE",
            credentials:"include",
            headers:{
                'Content-Type':'application/json'
            }
        })
        .then(response=>response.json())
        .then(data=>{
            if(data.message){
                NotificationManager.success(data.message);
                setData(data.data.data)
            }
            else{
                NotificationManager.error(data.error);
            }
        })
        
    }

    function updateItem(item){

        navigate(`/editProduct/${item}`)
    }


    return (
        <>
            <Header x="producer"/>

            {data.map((d)=>{
                return (

                    <Row className='main-content2'>
                    <Col md xs={12} className='col1'>
                    
                    <h3>{d.productName}</h3>
                    <p>{d.productDesc}</p>
                    </Col>
                    
                    <Col md xs={12} className='col1'>
                    
                    <div>
                        <label className='l'>Product Catrgory:</label>
                        <p className='p'>{d.productType}</p>
                    </div>
                    <div>
                    <label className='l'>Online/Offline:</label>
                    <p className='p'>{d.how}</p>
                    </div>
                        <div>
                        <label className='l'>Budget:</label>
                        <p className='p'>{`From $${d.range[0]} to $${d.range[1]}`}</p>
                    </div>
                    
                    </Col>
                    <Col md={2} xs={12} className='col1'>
                    
                    <div>
                    <div className='d-flex'>
                        <Button onClick={()=>updateItem(d._id)}>Edit <FontAwesomeIcon icon={faEdit}/></Button>

                    </div>
                    <br/>
                    <div className='d-flex'>
                        <Button onClick={()=>deleteItem(d._id)}>Delete <FontAwesomeIcon icon={faTrash}/></Button>
                    </div>
                    </div>
                    </Col>
                </Row>

                )
            })}  
            <NotificationContainer/>          
        </>
    );
}

export default AllProducts;