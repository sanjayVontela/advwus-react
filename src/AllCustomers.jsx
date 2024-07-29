import React, { useEffect, useState } from 'react';
import "./AllCustomers.css";
import Header from './Header';
import WishlistPosts from './components/wishlistPosts';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import LoadingComponent from './components/LoadingComponent';
import Pagination from './components/Pagination';

const AllCustomers = () => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [PostsperPage, setPostsPerPage] = useState(5);
    const [loading, setLoading] = useState(true)
    
    function addWishlist(email) {
        fetch(`http://localhost:4444/user/addWish/${email}`, {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data.message) {
                NotificationManager.success(data.message);
            } else if (data.already) {
                NotificationManager.info(data.already);
            } else {
                NotificationManager.error('Internal Server Error');
            }
        })
        .catch(err => console.error(err));
    }

    useEffect(() => {
        fetch("http://localhost:4444/user/allcustomers", {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data.data) {
                setData(data.data);
                setLoading(false)
            } else {
                setError(true);
                setErrorMsg(data.error);
                setLoading(false)
            }
        })
        .catch(err => console.error(err));
    }, []);

    const indexOfLastPost = currentPage*PostsperPage;
    const indexOfFirstPost = indexOfLastPost-PostsperPage;
    const currentPosts = data.slice(indexOfFirstPost,indexOfLastPost);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    if (error) {
        return <h1>{errorMsg}</h1>;
    }

    if(loading){
        <LoadingComponent />
    }

    return (
        <>
            <Header x="producer" />
            <WishlistPosts data={currentPosts} page="AllCustomers"/>
            <Pagination postsPerPage={PostsperPage} totalPosts={data.length} paginate={paginate}/>
            <NotificationContainer />
        </>
    );
    
}    

export default AllCustomers;
