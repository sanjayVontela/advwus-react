import React from 'react';
import { TextField } from '@mui/material';
import "./Login.css";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {NotificationContainer, NotificationManager} from 'react-notifications';

const Login = () => {

    const navigate = useNavigate();

    const [email,setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setErrors] = useState({});

    function checkEmail(email){
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return true;
        }
        return false;
      }
    

      function signIn(e) {

        // e.preventDefault();
        e.preventDefault();

        if(checkEmail(email) || password.length === ""){
          setErrors({
            email: checkEmail(email),
            password: password.length === 0
        });
        return;
        }
    
        const updatedData = {
          username:email,
          password:password,
        }
        
        console.log(updatedData);
        fetch("http://localhost:4444/auth/login",{
          method:"post",
          credentials:'include',
          headers:{
            "Content-Type": "application/json",
          },
          body:JSON.stringify(updatedData)
        }
        )
        .then(response=>response.json())
        .then(data=>{
            if(data.user){
                localStorage.setItem("role",data.user.role);
                localStorage.setItem("id",data.user._id);
                localStorage.setItem("fname",data.user.fname)
                if(data.user.role == "producer"){
                    navigate("/customers")
                }
                else{
                    navigate("/producers")
                }
            }
            else{
                NotificationManager.error(data.message);
            }
        })
        .catch(error=>console.error(error))
      }

    return (
        <>
            <div className='container'>
                <div className='row'>
                <div class="col-md-6 motto-class">
                    <img src="your-logo.png" alt="Logo" class="logo"/>
                    <p class="motto">ALL YOU NEED IS REACH FOR WHAT</p>
                    <p class = "motto second"> YOU ARE HAVING</p>
                </div>
                <div className='col-md-4 menu-main'>
                    <div className='login'>
                        <form>
                        <div className='text'>
                            <h4 style={{color:"white"}}>Login</h4>
                        </div>
                        <div>
                        <TextField type="string" label="email" variant="outlined" sx={{margin:"2% auto",width:"80%"}} error={error.email} required onChange={(e)=>setEmail(e.target.value)}/><br/>
                        <TextField type="password" label="password" variant="outlined" sx={{margin:"2% auto",width:"80%"}} error={error.password} required onChange={(e)=>setPassword(e.target.value)}/><br/>
                        <a className='btn' href="/forgot" style={{'color':'white'}}>Forgot password?</a><br/>
                        <div className='submit'>
                            <button className='btn btn-dark' type='submit' onClick={signIn}>Submit</button>
                        </div>
                        </div>
                        </form>
                    </div>

                </div>
                </div>

            </div>
            <NotificationContainer/>  
        </>
    );
};

export default Login;
