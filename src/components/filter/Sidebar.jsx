import React, { useState } from 'react';
import "./Sidebar.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { Button } from 'react-bootstrap';
import Category from './Category';
import Price from './Price';
import { TextField, Select, MenuItem } from '@mui/material';
import Slider from '@mui/material/Slider';
import Box from '@mui/material/Box';
const Sidebar = ({setSubmit}) => {
    const [value, setValue] = useState([10, 99999]);
    function valuetext(value) {
        return `${value}°C`;
      }

      const handleChange = (event, newValue) => {
        setValue(newValue);
        data["value"] = newValue
      };
    
    const data={cat:"",value:[10,99]}
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
        <div className='sidebar-filter'>
            
            {/* <Button className='button-sidebar' variant="outline-dark" ><FontAwesomeIcon className='icon-sidebar' icon={faBars} /></Button> */}
            <h3>Select Category</h3>
            <Select
                                    className='select'
                                    onChange={(e)=>data["cat"] =e.target.value}
                                    displayEmpty
                                    sx={{ margin: "2% auto", width: "80%" }}
                                    required
                                >
                                    <MenuItem value="" disabled selected>Select Category</MenuItem>
                                    {options.map(option => (
                                        <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                                    ))}
                                </Select>

            <h3>Range:</h3>
            <div style={{padding:"10px"}}>
            <Box>
                <Slider
                    getAriaLabel={() => 'Budget Range $'}
                    value={value}
                    onChange={handleChange}
                    valueLabelDisplay="auto"
                    getAriaValueText={valuetext}
                />
                </Box>

            </div>
           
            
            <Button onClick={()=>setSubmit(data)}>Submit</Button>
        </div>
    );
}

export default Sidebar;
