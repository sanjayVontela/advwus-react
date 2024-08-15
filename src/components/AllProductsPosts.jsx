import React from 'react';
import { Col, Container,Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

const AllProductsPosts = ({data}) => {

    const navigate = useNavigate();

    return (
        <div>
             {data.map((d)=>{
            return (

                <Row className='main-content-customers'>
                <Col md xs={12} className='col-customers'>
                
                <h3>{d.productName}</h3>
                <p>{d.productDesc}</p>
                </Col>
                
                <Col md xs={12} className='col-customers'>
                
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
                    <Button onClick={()=>navigate(`/chat/${d.userId}`)}>Connect</Button>
                </div>
                </Col>
               
            </Row>

            )
        })}         
        </div>
    );
}

export default AllProductsPosts;
