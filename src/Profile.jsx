import React, { useState, useEffect } from 'react';
import { TextField, Select, MenuItem } from '@mui/material';
import './Profile.css';
import { Button } from 'react-bootstrap';
import Header from './Header';


function Profile() {
  const [profileImage, setProfileImage] = useState({ preview: '', data: '' });
  const [imgUrl, setImgUrl] = useState("");

  const [profileData, setProfileData] = useState({
    fname: "",
    lname: "",
    username: "",
    password: "",
    confirmPassword: "",
    role: "",
    organizatonName: "",
    organizationBio: "",
    productName: "",
    productType: "",
    productDesc: "",
    range: [],
    channelName: "",
    channelDesc: "",
    where: [],
    how: "",
    youtube: "",
    insta: "",
    tiktok: "",
    profilePic: ""
  });

  const loadFile = (e) => {
    const img = {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0]
    };
    setProfileImage(img);
  };

  useEffect(() => {
    fetch('http://localhost:4444/auth/profile', {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => setProfileData(data))
      .catch(error => console.error('Error:', error));
  }, []);

  const where = [
    { value: "online", label: "Online" },
    { value: "offline", label: "Offline" },
    { value: "both", label: "Both" }
  ];

  const changeData = () => {
    fetch("http://localhost:4444/auth/changeprofile", {
      method: "POST",
      credentials: "include",
      body: JSON.stringify(profileData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(response => response.json())
      .then(data => {
        setProfileData(data);
      })
      .catch(error => console.error(error));
  };

  const changePassword = () => {
    const passwordData = {
      password: profileData.password
    };
    fetch("http://localhost:4444/auth/changepassword", {
      method: "POST",
      credentials: "include",
      body: JSON.stringify(passwordData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(response => response.json())
      .then(data => {
        alert(data);
      })
      .catch(error => console.error(error));
  };

  const submitImage = async (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append('image', profileImage.data);
    try {
      const response = await fetch('http://localhost:4444/image/imageUpload', {
        method: 'POST',
        body: formData,
        credentials: 'include'
      });
      const data = await response.json();
      setImgUrl(data.imgURL);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  if(profileData.role == "producer"){
    return (
      <>
      <Header x="producer"/>
      <div className='body'>
      <div className="profile-container">
        <div className="profile-details">
          <h1>Your Profile</h1>
          <form>
            <label htmlFor="firstname">First Name</label>
            <input type="text" id="firstname" name="firstname" value={profileData.fname} onChange={(e)=>setProfileData({...profileData, fname:e.target.value})}/>
            <label htmlFor="lastname">Last Name</label>
            <input type="text" id="lastname" name="lastname" value={profileData.lname} onChange={(e)=>setProfileData({...profileData, lname:e.target.value})}/>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" value={profileData.username} disabled />
            <label htmlFor="firstname">Organization Name</label>
            <input type="text" id="firstname" name="firstname" value={profileData.organizatonName} onChange={(e)=>setProfileData({...profileData, organizatonName:e.target.value})}/>
            <label htmlFor="firstname">Product Type</label>
            <input type="text" id="firstname" name="firstname" value={profileData.productType} onChange={(e)=>setProfileData({...profileData, productType:e.target.value})}/>
            <Button className='upload-button' onClick={()=>changeData()}>Submit</Button>
            <br/>
            <br/>
            <div className="change-password">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" name="password" onChange={(e)=>setProfileData({...profileData, password:e.target.value})}/>
              <button type="button" onClick={()=>changePassword()}>Change Password</button>
            </div>
          </form>
        </div>
        <div className="profile-picture">
          <img src={profileImage.preview || profileData.profilePic} alt="Avatar" />
          <form onSubmit={submitImage}>
            <label className="upload-button">
              Upload
              <input type="file" name='file' accept="image/*" onChange={loadFile} />
            </label>
            <br/>
            <input className="upload-button" type="submit" value="Submit" />
          </form>
        </div>
      </div>
      </div>
      </>
    );
  }
  else{
    return (
      <>
      <Header x="customer" />
      <div className='body'>
      <div className="profile-container">
        <div className="profile-details">
          <h1>Your Profile</h1>
            <label htmlFor="firstname">First Name</label>
            <input type="text" id="firstname" name="firstname" value={profileData.fname} onChange={(e)=>setProfileData({...profileData, fname:e.target.value})}/>
            <label htmlFor="lastname">Last Name</label>
            <input type="text" id="lastname" name="lastname" value={profileData.lname} onChange={(e)=>setProfileData({...profileData, lname:e.target.value})}/>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" value={profileData.username} disabled />
            <label>How do you Advertise?</label>
            <Select
                className='select'
                displayEmpty
                sx={{ margin: "2% auto", width: "80%" }}
                value={profileData.how}
                onChange={(e) => setProfileData({ ...profileData, how: e.target.value })}
                required
            >
                <MenuItem value="" disabled>How can you advertise?</MenuItem>
                {where.map(option => (
                    <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                ))}
            </Select>
            <label htmlFor="firstname">Instagram</label>
            <input type="text" id="firstname" name="firstname" value={profileData.insta} onChange={(e)=>setProfileData({...profileData, insta:e.target.value})}/>
            <label htmlFor="firstname">Youtube</label>
            <input type="text" id="firstname" name="firstname" value={profileData.youtube} onChange={(e)=>setProfileData({...profileData, youtube:e.target.value})}/>
            <label htmlFor="firstname">TikTok</label>
            <input type="text" id="firstname" name="firstname" value={profileData.tiktok} onChange={(e)=>setProfileData({...profileData, tiktok:e.target.value})}/>
            <Button className='upload-button' onClick={()=>changeData()}>Submit</Button>
            <br/>
            <br/>
            <div className="change-password">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" name="password" onChange={(e)=>setProfileData({...profileData, password:e.target.value})}/>
              <button type="button" onClick={()=>changePassword()}>Change Password</button>
            </div>
            
        </div>
        <div className="profile-picture">
          <img src={profileImage.preview || profileData.profilePic} alt="Avatar" />
          <form onSubmit={submitImage}>
            <label className="upload-button">
              Upload
              <input type="file" name='file' accept="image/*" onChange={loadFile} />
            </label>
            <br/>
            <input className="upload-button" type="submit" value="Submit" />
          </form>
        </div>
      </div>
      </div>
      </>
    );
  }

  
}

export default Profile;
