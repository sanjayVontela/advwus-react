import React, { useEffect, useState } from 'react';
import "./AllCustomers.css";
import Header from './Header';
import { Col, Container, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { NotificationContainer, NotificationManager } from 'react-notifications';

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

    return (
        <>
            <Header x="producer" />
            <Container fluid>
                {data.map(d => (
                    <Row className='main-content1' key={d.username}>
                        <Col md className='col1'>
                            <h3>{d.fname} {d.lname}, {d.channelName}</h3>
                            <div>
                                <label className='l'>Advertisement Category:</label>
                                <p className='p'>{d.how}</p>
                            </div>
                            <div>
                                <label className='l'>Where:</label>
                                <p className='p'>{d.where.join()}</p>
                            </div>
                        </Col>
                        <Col md className='col1'>
                            <div>
                                <label className='l'>YouTube:</label>
                                <p className='p'>{d.youtube}</p>
                            </div>
                            <div>
                                <label className='l'>Instagram:</label>
                                <p className='p'>{d.insta}</p>
                            </div>
                            <div>
                                <label className='l'>TikTok:</label>
                                <p className='p'>{d.tiktok}</p>
                            </div>
                            <div className='d-flex'>
                                <Button onClick={() => addWishlist(d.username)}>WishList</Button>
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
