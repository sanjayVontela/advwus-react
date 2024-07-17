import React, { useState } from 'react';
import { TextField, Select, MenuItem } from '@mui/material';
import "./signup.css";
import Slider from '@mui/material/Slider';
import Box from '@mui/material/Box';

const Signup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setErrors] = useState({});
    const [selectedRole, setSelectedRole] = useState("");
    const [value, setValue] = React.useState([10, 99999]);

    const [data, setData] = useState({
        email:"",
        password:"",
        confirmPassword:"",
        role:"",
        organizatonName:"",
        organizationBio:"",
        productName:"",
        productType:"",
        productDesc:"",
        range:[],
        channelName:"",
        channelDesc:"",
        where:[],
        how:"",
        youtube:"",
        insta:"",
        tiktok:""



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
        return (
            <>
                <TextField type="string" label="Channel Name" variant="outlined" sx={{ margin: "2% auto", width: "80%" }} error={error.email} required onChange={(e) => setData({...data,channelName:e.target.value})} /><br />
                <TextField type="string" label="Channel description" variant="outlined" sx={{ margin: "2% auto", width: "80%" }} error={error.email} required onChange={(e) => setData({...data,channelDesc:e.target.value})} /><br />
                <Select
                                    className='select'
                                    displayEmpty
                                    sx={{ margin: "2% auto", width: "80%" }}
                                    onChange={(e)=>setData({...data, how:e.target.value})}
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
                                    <input type="checkbox" id="youtube" name="youtube"  onClick={(e)=>data.where.push(e.target.value)}/>
                                    <label for="youtube">Youtube</label>
                                </div>

                                <div>
                                    <input type="checkbox" id="events" name="events" onClick={(e)=>data.where.push(e.target.value)}/>
                                    <label for="horns">Events</label>
                                </div>
                                </fieldset>
                <TextField type="string" label="Youtube account" variant="outlined" sx={{ margin: "2% auto", width: "80%" }} error={error.email} required onChange={(e) => setData({...data,youtube:e.target.value})} /><br />
                <TextField type="string" label="Instagram account" variant="outlined" sx={{ margin: "2% auto", width: "80%" }} error={error.email} required onChange={(e) => setData({...data,insta:e.target.value})} /><br />
                <TextField type="string" label="TikToc account" variant="outlined" sx={{ margin: "2% auto", width: "80%" }} error={error.email} required onChange={(e) => setData({...data,tiktok:e.target.value})} /><br />
            </>
        );
    }
    function producer() {
        const options = [
            { value: "automotive", label: "Automotive" },
            { value: "real_estate", label: "Real Estate" },
            { value: "technology", label: "Technology" },
            { value: "health_fitness", label: "Health and Fitness" },
            { value: "fashion_beauty", label: "Fashion and Beauty" },
            { value: "food_beverage", label: "Food and Beverage" },
            { value: "travel_tourism", label: "Travel and Tourism" },
            { value: "education", label: "Education" },
            { value: "entertainment", label: "Entertainment" },
            { value: "finance", label: "Finance" },
            { value: "home_garden", label: "Home and Garden" },
            { value: "sports_outdoors", label: "Sports and Outdoors" },
            { value: "pets", label: "Pets" },
            { value: "automotive_services", label: "Automotive Services" },
            { value: "media_publishing", label: "Media and Publishing" },
            { value: "business_services", label: "Business Services" },
            { value: "personal_services", label: "Personal Services" },
            { value: "events_occasions", label: "Events and Occasions" },
            { value: "non_profit_community", label: "Non-Profit and Community" },
            { value: "professional_services", label: "Professional Services" }
          ];

        

        function valuetext(value) {
            return `${value}°C`;
          }

          const handleChange = (event, newValue) => {
            setValue(newValue);
            setData({...data, range:newValue})
          };
        
        return (
            <>
                <TextField type="string" label="Organization's Name" variant="outlined" sx={{ margin: "2% auto", width: "80%" }} error={error.email} required onChange={(e) => setData({...data, organizatonName:e.target.value})} /><br />
                <TextField type="string" label="Bio about organization" variant="outlined" sx={{ margin: "2% auto", width: "80%" }} error={error.email} required onChange={(e) => setData({...data, organizationBio:e.target.value})} /><br />
                <TextField type="string" label="Product Name" variant="outlined" sx={{ margin: "2% auto", width: "80%" }} required onChange={(e)=>setData({...data, productName:e.target.value})} /><br />
                <Select
        className='select'
        displayEmpty
        sx={{ margin: "2% auto", width: "80%" }}
        onChange={(e) => setData({ ...data, productType: e.target.value })}
        value={data.productType}  // Ensure value is always defined
        required
      >
        <MenuItem value="" disabled>Select Product Type</MenuItem>
        {options.map(option => (
          <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
        ))}
      </Select>
                <TextField type="string" label="Product Description" variant="outlined" sx={{ margin: "2% auto", width: "80%" }} required onChange={(e)=>setData({...data, productDesc:e.target.value})} /><br />
                <Box sx={{ width: 300 }}>
                <Slider
                    getAriaLabel={() => 'Budget Range $'}
                    value={value}
                    onChange={handleChange}
                    valueLabelDisplay="auto"
                    getAriaValueText={valuetext}
                />
                </Box>
            </>
        );
    }
    

    function signIn() {
        if (checkEmail(data.email) || data.password.length === "") {
            setErrors({
                email: checkEmail(email),
                password: password.length === 0
            });
            return;
        }

        if(data.password != data.confirmPassword){
            alert("Passwords doesn't match")
            return
        }

        console.log(data);

        // Uncomment the fetch code when needed
        // fetch("http://localhost:4444/login",{
        //   method:"post",
        //   credentials:'include',
        //   headers:{
        //     "Content-Type": "application/json",
        //   },
        //   body:JSON.stringify(updatedData)
        // })
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
                                <TextField type="string" label="UserName/Email" variant="outlined" sx={{ margin: "2% auto", width: "80%" }} error={error.email} required onChange={(e) => setData({...data,email:e.target.value})} /><br />
                                <TextField type="password" label="Password" variant="outlined" sx={{ margin: "2% auto", width: "80%" }} error={error.password} required onChange={(e) => setData({...data,password:e.target.value})} /><br />
                                <TextField type="password" label="Confirm Password" variant="outlined" sx={{ margin: "2% auto", width: "80%" }} error={error.password} required onChange={(e) => setData({...data,confirmPassword:e.target.value})} /><br />

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
                                    <button className='btn btn-dark' type='submit' onClick={() => signIn()}>Submit</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Signup;
