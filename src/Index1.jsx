import React from 'react';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "./Index1.css";
import { faFacebookF, faTwitter,faInstagram } from "@fortawesome/free-brands-svg-icons"
import { Link } from 'react-router-dom';
const Index = () => {
    return (
        <>
            <div className='container'>
                <div className='row'>
                    <div className='col-md-6'>
                        <img src="your-logo.png" alt="Logo" className='logo'/>
                        <p className='motto'>ALL YOU NEED IS REACH FOR WHAT</p>
                        <p className='motto second'>YOU ARE HAVING</p>
                    </div>
                    <div className='col-md-4 menu-main'>
                        <div className='menu'>
                            <Link to="/login" className='btn' style={{color:"white"}}>Login</Link>
                            <Link to="/signup" className='btn' style={{color:"white"}}>Sign Up</Link>
                            <Link to="/login" className='btn' style={{color:"white"}}>Story of Advwus</Link>
                            <Link to="/login" className='btn'  style={{color:"white"}}>FAQ</Link>
                            <Link to="/login" className='btn'  style={{color:"white"}}>About Us</Link>
                            <Link to="/login" className='btn'  style={{color:"white"}}>Suggestion Box</Link>
                            {/* <button className="btn">Login</button><br/> */}
                            
                            <div>
                                <a className="social" href="https://twitter.com/vontelasanjay"><FontAwesomeIcon  style={{color:"white"}} icon={faFacebookF}/></a>
                                <a className="social" href="https://twitter.com/vontelasanjay"><FontAwesomeIcon  style={{color:"white"}} icon={faTwitter}/></a>
                                <a className="social" href="https://twitter.com/vontelasanjay"><FontAwesomeIcon  style={{color:"white"}} icon={faInstagram}/></a>
                            </div>


                        </div>


                    </div>

                </div>

            </div>
        </>
    );
}

export default Index;
