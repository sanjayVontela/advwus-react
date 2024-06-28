import React from 'react';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "./Index.css";
import { faFacebookF, faTwitter,faInstagram } from "@fortawesome/free-brands-svg-icons"

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
                            <button className="btn">Login</button><br/>
                            <button className="btn">Sign Up</button><br/>
                            <button className="btn">Story of Advwus</button><br/>
                            <button className="btn">FAQ</button><br/>
                            <button className="btn">About Us</button><br/>
                            <button className="btn">Suggestion Box</button><br/>
                            <div>
                                <a className="social" href="https://twitter.com/vontelasanjay"><FontAwesomeIcon icon={faFacebookF}/></a>
                                <a className="social" href="https://twitter.com/vontelasanjay"><FontAwesomeIcon icon={faTwitter}/></a>
                                <a className="social" href="https://twitter.com/vontelasanjay"><FontAwesomeIcon icon={faInstagram}/></a>
                            </div>


                        </div>


                    </div>

                </div>

            </div>
        </>
    );
}

export default Index;
