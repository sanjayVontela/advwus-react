import React, { useEffect, useState } from 'react';
import "./AllCustomers.css"
import Header from './Header';

import LoadingComponent from './components/LoadingComponent';
import Pagination from './components/Pagination';
import AllProductsPosts from './components/AllProductsPosts';

import Sidebar from './components/filter/Sidebar';

const AllProducts = () => {


    const [data,setData] = useState([]);
    const [error,setError]  = useState({
        msg:"", e:false
    })
    
    const [loading, setLoading] = useState(true)
    const [errorMsg, setErrorMsg] = useState("")
    const [currentPage, setCurrentPage] = useState(1);
    const [PostsperPage, setPostsPerPage] = useState(10);
    const [submit, setSubmit] = useState({})
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    useEffect(()=>{

        fetch("http://localhost:4444/user/allproducts",{
            method:"GET",
            credentials:"include",
            headers:{
                'Content-Type':"application/json"
            }
        })
        .then(response=>response.json())
        .then(data=>{
            if(data.data){
                setData(data.data)
                setLoading(false)
            }
            else{
                setError({msg:data.error, e:true })
                setLoading(false)
            }
        })

    },[])
    const indexOfLastPost = currentPage*PostsperPage;
    const indexOfFirstPost = indexOfLastPost-PostsperPage;
    const currentPosts = data.slice(indexOfFirstPost,indexOfLastPost);

    // console.log(data);

    if(error.e){
        return <h1>{error.msg}</h1>
    }
    if(loading){
        <LoadingComponent />
    }
    console.log(submit);
    return (
        <>
        <Header x="consumer"/>
        {/* <Sidebar setSubmit={setSubmit} /> */}
        <AllProductsPosts data={currentPosts} />
        <Pagination postsPerPage={PostsperPage} totalPosts={data.length} paginate={paginate} />
       
    </>
    );
}

export default AllProducts;
