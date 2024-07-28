import React, { useState } from 'react';
import { TextField, Select, MenuItem } from '@mui/material';
import "./signup.css";
import { useNavigate } from 'react-router-dom';
import PasswordChecklist from "react-password-checklist";
import validator from 'validator';

const Signup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setErrors] = useState({});
    const [selectedRole, setSelectedRole] = useState("");
    const [value, setValue] = React.useState([10, 99999]);
    const Navigate = useNavigate();
    const [data, setData] = useState({
        fname:"",
        lname:"",
        username:"",
        password:"",
        confirmPassword:"",
        role:"",
        organizatonName:"",
        organizationBio:"",
        channelName:"",
        channelDesc:"",
        where:[],
        how:"",
        youtube:"",
        insta:"",
        tiktok:"",
        profilePic:""

    })

    function checkEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return !emailRegex.test(email);
    }

    const options = [
        { value: "producer", label: "Producer" },
        { value: "consumer", label: "Consumer" }
    ];

    function consumer() {
        const where = [
            {value:"online", label:"Online"},
            {value:"offline", label:"Offline"},
            {value:"both", label:"Both"}
        ]

        function how(item){
            if (data.where.includes(item)){
                data.where = data.where.filter((element)=> {return element != item} )
            }
            else{
                data.where.push(item)
            }
        }

        return (
            <>
                <TextField type="string" label="Channel Name" variant="outlined" sx={{ margin: "2% auto", width: "80%" }} error={error.channelName} required onChange={(e) => setData({...data,channelName:e.target.value})} /><br />
                <TextField type="string" label="Channel description" variant="outlined" sx={{ margin: "2% auto", width: "80%" }} error={error.channelDesc}  required onChange={(e) => setData({...data,channelDesc:e.target.value})} /><br />
                <Select
                className='select'
                displayEmpty
                sx={{ margin: "2% auto", width: "80%" }}
                value={data.how}
                onChange={(e) => setData({ ...data, how: e.target.value })}
                required
            >
                <MenuItem value="" disabled>How can you advertise?</MenuItem>
                {where.map(option => (
                    <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                ))}
            </Select>
                                <fieldset>
                                <legend>Where can you advertise:</legend>

                                <div>
                                    <input type="checkbox" id="Youtube" name="youtube"  onClick={(e)=>how(e.target.id)}/>
                                    <label for="youtube">Youtube</label>
                                </div>
                                <div>
                                    <input type="checkbox" id="Instagram" name="instagram"  onClick={(e)=>how(e.target.id)}/>
                                    <label for="youtube">Instagram</label>
                                </div>
                                <div>
                                    <input type="checkbox" id="Tiktok" name="tiktok"  onClick={(e)=>how(e.target.id)}/>
                                    <label for="youtube">Tiktok</label>
                                </div>

                                <div>
                                    <input type="checkbox" id="Events" name="events" onClick={(e)=>how(e.target.id)}/>
                                    <label for="horns">Events</label>
                                </div>
                                </fieldset>
                <TextField type="string" label="Youtube account" variant="outlined" sx={{ margin: "2% auto", width: "80%" }}  required onChange={(e) => setData({...data,youtube:e.target.value})} /><br />
                <TextField type="string" label="Instagram account" variant="outlined" sx={{ margin: "2% auto", width: "80%" }}  required onChange={(e) => setData({...data,insta:e.target.value})} /><br />
                <TextField type="string" label="TikToc account" variant="outlined" sx={{ margin: "2% auto", width: "80%" }}  required onChange={(e) => setData({...data,tiktok:e.target.value})} /><br />
            </>
        );
    }
    function producer() {
        const options = [
            { value: "Automotive", label: "Automotive" },
            { value: "Real Estate", label: "Real Estate" },
            { value: "Technology", label: "Technology" },
            { value: "Health Fitness", label: "Health and Fitness" },
            { value: "Fashion Beauty", label: "Fashion and Beauty" },
            { value: "Food Beverage", label: "Food and Beverage" },
            { value: "Travel Tourism", label: "Travel and Tourism" },
            { value: "Education", label: "Education" },
            { value: "Entertainment", label: "Entertainment" },
            { value: "Finance", label: "Finance" },
            { value: "Home Garden", label: "Home and Garden" },
            { value: "sports Outdoors", label: "Sports and Outdoors" },
            { value: "Pets", label: "Pets" },
            { value: "Automotive Services", label: "Automotive Services" },
            { value: "Media Publishing", label: "Media and Publishing" },
            { value: "Business Services", label: "Business Services" },
            { value: "Personal Services", label: "Personal Services" },
            { value: "Events Occasions", label: "Events and Occasions" },
            { value: "Non Profit Community", label: "Non-Profit and Community" },
            { value: "Professional Services", label: "Professional Services" }
          ];

  
        return (
            <>
                <TextField type="string" label="Organization's Name" variant="outlined" sx={{ margin: "2% auto", width: "80%" }} error={error.organizatonName}  required onChange={(e) => setData({...data, organizatonName:e.target.value})} /><br />
                <TextField type="string" label="Bio about organization" variant="outlined" sx={{ margin: "2% auto", width: "80%" }} error={error.organizationBio}  required onChange={(e) => setData({...data, organizationBio:e.target.value})} /><br />
               
            </>
        );
    }
    
    const passwordValidator = (password)=>{
        if(validator.isStrongPassword(password, { 
         minLength: 8, minLowercase: 1, 
         minUppercase: 1, minNumbers: 1, minSymbols: 1 
     })){
       return false;
     }
     }
    function signIn(e) {


        e.preventDefault();

        console.log(JSON.stringify(data));
        if (checkEmail(data.username) ||  passwordValidator(data.password)) {
            setErrors({
                email: checkEmail(data.username),
                password : !passwordValidator(data.password),
                fname : data.fname.length === 0,
                lname : data.lname.length === 0,
                organizatonName:data.organizatonName.length===0,
                organizationBio:data.organizationBio.length===0,
                channelName:data.channelName.length===0,
                channelDesc:data.channelDesc.length===0,

            });
            return;
        }

        if(data.password != data.confirmPassword){
            alert("Passwords doesn't match")
            return
        }

        console.log(data);

        fetch("http://localhost:4444/auth/register",{
          method:"post",
          credentials:'include',
          headers:{
            "Content-Type": "application/json",
          },
          body:JSON.stringify(data)
        })
        .then(response=>response.json())
        .then(data=>{
            if(data.new_user){
                alert("User created successfully")
                Navigate("/login");
            }
        })
        .catch(error=>console.error(error))
    }

    return (
        <>  
            <form>
            <div className='container'>
                <div className='row'>
                    <div className="col-md-6 motto-class">
                        <img src="your-logo.png" alt="Logo" className="logo" />
                        <p className="motto">ALL YOU NEED IS REACH FOR WHAT</p>
                        <p className="motto second"> YOU ARE HAVING</p>
                    </div>
                    <div className='col-md-4 menu-main'>
                        <div className='login'>
                            <div className='text'>
                                <h4 style={{ color: "white" }}>SignUp</h4>
                            </div>
                            <div>
                                <TextField type="string" label="First Name" variant="outlined" sx={{ margin: "2% auto", width: "80%" }} error={error.fname}  required onChange={(e) => setData({...data,fname:e.target.value})} /><br />
                                <TextField type="string" label="Last Name" variant="outlined" sx={{ margin: "2% auto", width: "80%" }} error={error.lname}  required onChange={(e) => setData({...data,lname:e.target.value})} /><br />
                                <TextField type="string" label="UserName/Email" variant="outlined" sx={{ margin: "2% auto", width: "80%" }} error={error.email}  required onChange={(e) => setData({...data,username:e.target.value})} /><br />
                                <TextField type="password" label="Password" variant="outlined" sx={{ margin: "2% auto", width: "80%" }} error={error.password}  required onChange={(e) => setData({...data,password:e.target.value})} /><br />
                                <TextField type="password" label="Confirm Password" variant="outlined" sx={{ margin: "2% auto", width: "80%" }}  required onChange={(e) => setData({...data,confirmPassword:e.target.value})} /><br />
                                <PasswordChecklist
				rules={["minLength","specialChar","number","capital","match"]}
				minLength={8}
				value={data.password}
				valueAgain={data.confirmPassword}
				messages={{
					minLength: "The Password must contain more than 8 characters",
					specialChar: "Password has special characters.",
					number: "Password has number.",
					capital: "Password has capital letter.",
					match: "passwords should match.",
				}}
			/>
                                <Select
                                    className='select'
                                    value={data.role}
                                    onChange={(e) => setData({...data,role:e.target.value})}
                                    displayEmpty
                                    sx={{ margin: "2% auto", width: "80%" }}
                                    required
                                >
                                    <MenuItem value="" disabled>Select Role</MenuItem>
                                    {options.map(option => (
                                        <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                                    ))}
                                </Select>
                                {data.role === "consumer" && consumer() || data.role == "producer" && producer() }
                                <div className='submit'>
                                    <button className='btn btn-dark' type='submit' onClick={signIn}>Submit</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </form>
        </>
    );
};

export default Signup;
