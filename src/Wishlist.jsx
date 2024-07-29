import React, { Suspense, useEffect } from 'react';
import "./AllCustomers.css"
import Header from './Header';
import { Col, Container,Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import Sidebar from './components/filter/Sidebar';
import WishlistPosts from './components/wishlistPosts';
import Pagination from './components/Pagination';

import LoadingComponent from './components/LoadingComponent';
const Wishlist = () => {


    const [data, setData] = useState([])
    const [error,setError] = useState(false)
    const [loading, setLoading] = useState(true)
    const [errorMsg, setErrorMsg] = useState("")
    const [currentPage, setCurrentPage] = useState(1);
    const [PostsperPage, setPostsPerPage] = useState(5);

    const indexOfLastPost = currentPage*PostsperPage;
    const indexOfFirstPost = indexOfLastPost-PostsperPage;
    const currentPosts = data.slice(indexOfFirstPost,indexOfLastPost);

    function removeWishlist(id){
        console.log(id);
        fetch(`http://localhost:4444/user/deleteWishlist/${id}`,{
            method:"DELETE",
            credentials:"include",
            headers:{
                "Content-Type":"application/json"
            }
        })
        .then(response=>response.json())
        .then(data=>{
            if(data.data){
                NotificationManager.success(data.message);
                setData(data.data)
                
            }else{
                NotificationManager.error(data.error);
            }
        })
        .catch(err=>console.error(err))

    }
    
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    useEffect(()=>{
            fetch("http://localhost:4444/user/allWishlist",{
                method:"GET",
                credentials:"include",
                headers:{
                    "Content-Type":"application/json"
                }
            })
            .then(response=>response.json())
            .then(data=>{
                if(data.data){
                    setData(data.data)
                    setLoading(false)
                }else{
                    // console.log(data.error);
                    setError(true)
                    setErrorMsg(data.error)
                    setLoading(false)
                }
            })
            .catch(err=>console.error(err))
    },[])

    console.log(error);

if(error){

    return (

        <h1>{error}</h1>
    )
}
if(loading){
    return <LoadingComponent />
}
else{
    return (
        <>
            <Header x="producer" />
           
           <WishlistPosts data={currentPosts} removeWishlist={removeWishlist} />
           <Pagination postsPerPage={PostsperPage} totalPosts={data.length} paginate={paginate} />

            <NotificationContainer />
        </>
    );
}
    

    
}

export default Wishlist;
