import React, { useEffect, useState } from 'react';
import "./AllCustomers.css"
import Header from './Header';
import { Col, Container,Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';

const AllProducts = () => {


    const [data,setData] = useState([]);
    const [error,setError]  = useState({
        msg:"", e:false
    })


    useEffect(()=>{

        fetch("http://localhost:4444/user/allproducts",{
            method:"GET",
            credentials:"include",
            headers:{
                'Content-Type':"application/json"
            }
        })
        .then(response=>response.json())
        .then(data=>{
            if(data.data){
                setData(data.data)
            }
            else{
                setError({msg:data.error, e:true })
            }
        })

    },[])

    // console.log(data);

    if(error.e){
        return <h1>{error.msg}</h1>
    }
    return (
        <>
        <Header x="consumer"/>

        {data.map((d)=>{
            return (

                <Row className='main-content1'>
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
                <div>
                    <Button>Connect</Button>
                </div>
                </Col>
               
            </Row>

            )
        })}         
    </>
    );
}

export default AllProducts;
