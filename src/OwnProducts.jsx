import React, { useEffect, useState } from 'react';
import "./OwnProducts.css"
import Header from './Header';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import { useNavigate } from 'react-router-dom';
import LoadingComponent from './components/LoadingComponent';
import Pagination from './components/Pagination';
import OwnProductsPosts from './components/OwnProductsPosts';
const AllProducts = () => {

    const [data,setData] = useState([])
    const [error,setError] = useState({
        e:false,msg:""
    })
    const [currentPage, setCurrentPage] = useState(1);
    const [PostsperPage, setPostsPerPage] = useState(5);
    const [loading, setLoading] = useState(true)
    

    const navigate = useNavigate();
    useEffect(()=>{

        fetch("http://localhost:4444/user/ownProducts",{
            method:"GET",
            credentials:'include',
            headers:{
            'Content-Type':'application/json',
            },
        })
        .then(response=>response.json())
        .then(data=>{
            if(data.data){
                setData(data.data)
                setLoading(false)
            }
            else{
                setError({... error, e:true,msg:data.error})
                setLoading(false)
            }
            
        })
        .catch  (error=>console.error(error))
    },[])
    const indexOfLastPost = currentPage*PostsperPage;
    const indexOfFirstPost = indexOfLastPost-PostsperPage;
    const currentPosts = data.slice(indexOfFirstPost,indexOfLastPost);
    
    function deleteItem(itemId){
        console.log(itemId);

        fetch(`http://localhost:4444/user/deleteItem/${itemId}`,{
            method:"DELETE",
            credentials:"include",
            headers:{
                'Content-Type':'application/json'
            }
        })
        .then(response=>response.json())
        .then(data=>{
            if(data.message){
                NotificationManager.success(data.message);
                setData(data.data.data)
            }
            else{
                NotificationManager.error(data.error);
            }
        })
        
    }

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    function updateItem(item){

        navigate(`/editProduct/${item}`)
    }

    if(error.e){
        return <h1>{error.msg}</h1>
    }
    if(loading){
        return <LoadingComponent />
    }

    return (
        <>
            <Header x="producer"/>
            <OwnProductsPosts data={currentPosts} updateItem={updateItem} deleteItem={deleteItem} />
            <Pagination postsPerPage={PostsperPage} totalPosts={data.length} paginate={paginate}/>
           
            <NotificationContainer/>          
        </>
    );
}

export default AllProducts;