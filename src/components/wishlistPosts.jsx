import React from 'react';
import { Col, Container,Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faYoutube,faInstagram,faTiktok,faRocketchat } from '@fortawesome/free-brands-svg-icons';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
const WishlistPosts = ({data,page,removeWishlist,addWishlist}) => {
    const navigate = useNavigate()
    return (
        <>
             <Container fluid>
                {data.map(d => (
                    <Row className='main-content-customers' key={d.username}>
                        <Col md className='col-customers'>
                            <div className='profile-picture1'>
                                <h3>{d.fname} {d.lname}, {d.channelName}</h3>
                                <img src={d.profilePic} alt="Avatar" />
                            </div>
                        </Col>
                        <Col md className='col-customers'>
                            <div>
                                <label className='l'>Advertisement Category:</label>
                                <p className='p'>{d.how}</p>
                            </div>
                            <div>
                                <label className='l'>Where:</label>
                                <p className='p'>{d.where.join()}</p>
                            </div>
                        </Col>
                        <Col md className='col-customers'>
                            <div>
                                <a href={d.youtube} target="_blank" rel="noopener noreferrer">
                                    <FontAwesomeIcon style={{fontSize:"50px"}} className='icon' icon={faYoutube} />
                                </a>
                                <a href={d.insta} target="_blank" rel="noopener noreferrer">
                                    <FontAwesomeIcon style={{fontSize:"50px"}} className='icon' icon={faInstagram} />
                                </a>
                                <a href={d.tiktok} target="_blank" rel="noopener noreferrer">
                                    <FontAwesomeIcon style={{fontSize:"50px"}} className='icon' icon={faTiktok} />
                                </a>
                            </div>
                            <div></div>
                            <div></div>
                            {
                               page === "AllCustomers"?   ( <div className='d-flex'>
                               <Button className='icon' onClick={() => addWishlist(d.username)}>
                                   <FontAwesomeIcon icon={faHeart} />Wishlist
                               </Button>
                               <Button className='icon' onClick={() => navigate(`/chat/${d._id}`)}>
                                   <FontAwesomeIcon icon={faRocketchat} />Chat
                               </Button>
                           </div>):( <div className='d-flex'>
                            <Button className='icon' onClick={() => removeWishlist(d.username)}>
                                <FontAwesomeIcon icon={faHeart} />Remove
                            </Button>
                            <Button className='icon' onClick={() => navigate(`/chat/${d._id}`)}>
                                <FontAwesomeIcon icon={faRocketchat} />Chat
                            </Button>
                        </div>)

                            }
                           
                        </Col>
                    </Row>
                ))}
                
            </Container>
        </>
    );
};




export default WishlistPosts;
