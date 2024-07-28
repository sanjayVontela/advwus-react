import React, { useEffect, useState } from 'react';
import "./AllCustomers.css";
import Header from './Header';
import { Col, Container, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faYoutube,faInstagram,faTiktok,faRocketchat } from '@fortawesome/free-brands-svg-icons';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
const AllCustomers = () => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    function addWishlist(email) {
        fetch(`http://localhost:4444/user/addWish/${email}`, {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data.message) {
                NotificationManager.success(data.message);
            } else if (data.already) {
                NotificationManager.info(data.already);
            } else {
                NotificationManager.error('Internal Server Error');
            }
        })
        .catch(err => console.error(err));
    }

    useEffect(() => {
        fetch("http://localhost:4444/user/allcustomers", {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data.data) {
                setData(data.data);
            } else {
                setError(true);
                setErrorMsg(data.error);
            }
        })
        .catch(err => console.error(err));
    }, []);

    if (error) {
        return <h1>{errorMsg}</h1>;
    }

    // console.log(data);/

    return (
        <>
            <Header x="producer" />
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
                            <div className='d-flex'>
                                <Button className='icon' onClick={() => addWishlist(d.username)}>
                                    <FontAwesomeIcon icon={faHeart} />Wishlist
                                </Button>
                                <Button className='icon' onClick={() => addWishlist(d.username)}>
                                    <FontAwesomeIcon icon={faRocketchat} />Chat
                                </Button>
                            </div>
                        </Col>
                    </Row>
                ))}
            </Container>
            <NotificationContainer />
        </>
    );
    
}    

export default AllCustomers;
