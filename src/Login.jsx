import React from 'react';
import { TextField } from '@mui/material';
import "./Login.css";
import { useState } from 'react';


const Login = () => {

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
    

      function signIn() {


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
        
        // fetch("http://localhost:4444/login",{
        //   method:"post",
        //   credentials:'include',
        //   headers:{
        //     "Content-Type": "application/json",
        //   },
        //   body:JSON.stringify(updatedData)
        // }
        // )
        // .then(response=>response.json())
        // .then(data=>{
        //   if(data.message === "Login successful"){
        //     navigate("/home", {state:data.user})
        //   }else{
        //     alert(data.message);
        //   }
        // })
        // .catch(error=>console.error(error))
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
                        <div className='text'>
                            <h4>Login</h4>
                        </div>
                        <div>
                        <TextField type="string" label="email" variant="outlined" sx={{margin:"2% auto",width:"80%"}} error={error.email} required onChange={(e)=>setEmail(e.target.value)}/><br/>
                        <TextField type="password" label="password" variant="outlined" sx={{margin:"2% auto",width:"80%"}} error={error.password} required onChange={(e)=>setPassword(e.target.value)}/><br/>
                        <a className='btn' href="">Forgot password?</a><br/>
                        <div className='submit'>
                            <button className='btn btn-dark' type='submit' onClick={()=>signIn()}>Submit</button>
                        </div>
                        </div>
                    </div>

                </div>
                </div>

            </div>
        </>
    );
};

export default Login;
