import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';



const Logout = () => {

    const navigate = useNavigate();

    useEffect(()=>{

        fetch("http://localhost:4444/auth/logout",{
            credentials:"include",
            method:"GET",
            headers:{
                'Content-Type':'application/json'
            }
        })
        .then(response=>response.json())
        .then(data=>{{if(data.message){
            navigate("/")
        }}})
        .catch(error=>console.error(error))

        localStorage.clear()
    })

    return (
        <div>
            
        </div>
    );
}

export default Logout;
