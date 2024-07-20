import React, { useEffect } from 'react';
// import './Profile.css';
// import "./signup.css";
import './AddProduct.css';
import { useState } from 'react';
import Slider from '@mui/material/Slider';
import Box from '@mui/material/Box';
import { TextField, Select, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

import Header from './Header';
const AddProduct = () => {
    const id = useParams();
    console.log(id);
    const [value, setValue] = React.useState([10, 99999]);
    const [data, setData] = useState({
        productName:"",
        productType:"",
        productDesc:"",
        range:value,
        how:""
    })

    const [newData, setNewData] = useState({productName:"",
        productType:"",
        productDesc:"",
        range:value,
        how:""})

        useEffect(()=>{

            fetch(`http://localhost:4444/user/getProduct/${id.id}`,{
                method:"GET",
                credentials:'include',
                headers:{
                'Content-Type':'application/json',
                },
            })
            .then(response=>response.json())
            .then(data=>setData(data.data))
            .catch  (error=>console.error(error))
        },[])

        console.log(data);
    
    const navigate = useNavigate();

    function valuetext(value) {
        return `${value}°C`;
      }

      const handleChange = (event, newValue) => {
        setValue(newValue);
        setData({...data, range:newValue})
      };
    
      function handleSubmit(e){

        e.preventDefault();
        // console.log(data);

        fetch("http://localhost:4444/user/editProduct",{
            method:"POST",
            credentials:"include",
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(data)
        })
        .then(response=>response.json())
        .then(data=>{
          if(data.message){
            alert(data.message);
            navigate("/ownProducts");
          }else{
            alert(data.error);
          }
        })
        .catch(error=>console.error(error))


      }

      const where = [
        {value:"online", label:"Online"},
        {value:"offline", label:"Offline"},
        {value:"both", label:"Both"}
    ]

    
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


    return (
        <>
        <form onSubmit={handleSubmit}>
        <Header x="producer"/>
        <div className='desc'>
            <h1>Add Product</h1>
            <TextField type="string" label="Product Name" variant="outlined" sx={{ margin: "2% auto", width: "80%" }} value={data.productName} required onChange={(e)=>setData({...data, productName:e.target.value})} /><br />
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
      </Select> <br/>
                <label htmlFor="desc1">Product Description</label><br/>
                <textarea className='textarea' name='desc1' value={data.productDesc} onChange={(e)=>setData({...data, productDesc:e.target.value})} ></textarea><br/>
                {/* <TextField type="string" label="Product Description" variant="outlined" sx={{ margin: "2% auto", width: "80%" }} required onChange={(e)=>setData({...data, productDesc:e.target.value})} /><br /> */}
                <Select
                className='select'
                displayEmpty
                sx={{ margin: "2% auto", width: "80%" }}
                value={data.how}
                onChange={(e) => setData({ ...data, how: e.target.value })}
                required
            >
                <MenuItem value="" disabled>How do you want to be advertised?</MenuItem>
                {where.map(option => (
                    <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                ))}
            </Select><br/>
                <label htmlFor="desc1">Range</label><br/>
                <Box sx={{ width: 300 }}>
                <Slider
                    getAriaLabel={() => 'Budget Range $'}
                    value={data.range}
                    onChange={handleChange}
                    valueLabelDisplay="auto"
                    getAriaValueText={valuetext}
                />
                </Box>
                </div>
                <button className='button1 btn btn-primary' type="submit">Submit</button>
                </form>
          
        </>
    );
}

export default AddProduct;
