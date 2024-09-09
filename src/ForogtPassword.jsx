import React, { useState } from 'react'
import "./ForgotPassword.css"
import { NotificationContainer, NotificationManager } from 'react-notifications';
function ForogtPassword() {

  const [email, setEmail] = useState("");

  function checkEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return !emailRegex.test(email);
}

  const handleSubmit = (e)=>{
    e.preventDefault();
    console.log(email);
    
    if(checkEmail(email)){
      NotificationManager.error('Invalid Email');
      return
    };



  }

  return (
    <>
    <div class="container container-forgot">
    <div class="forgot-password-box">
        <h2 className='text-color'>Forgot Your Password?</h2>
        <p className='text-color'>Enter your email address below, and we'll send you a link to reset your password.</p>
        <form id="forgot-password-form">
            <div class="input-group">
                <label for="email"><span className='text-color'>Email Address</span></label>
                <input type="email" id="email" placeholder="Enter your email" required onChange={(e)=>setEmail(e.target.value)}/>
            </div>
            <button type="submit" class=" btn btn-dark" onClick={handleSubmit}>Send Reset Link</button>
        </form>
    </div>
</div>
<NotificationContainer />
</>
  )
}

export default ForogtPassword