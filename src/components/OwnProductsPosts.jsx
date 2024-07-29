import React from 'react';
import { Col, Container,Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
const OwnProductsPosts = ({data,updateItem,deleteItem}) => {
    return (
        <div>
             {data.map((d)=>{
                return (

                    <Row className='main-content-customers'>
                    <Col md xs={12} className='col-customers'>
                    
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
                    <Col md={2} xs={12} className='col-customers'>
                    
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
        </div>
    );
}

export default OwnProductsPosts;
