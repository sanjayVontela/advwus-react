import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from "./Login";
import Index from "./Index1";
import AllCustomers from './AllCustomers';
import AllProducts from './AllProducts';
import Customer from './Customer';
import Producer from './Producer';
import Admin from './Admin';
import Signup from './Signup';
import Profile from './Profile';

const RoutesList = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Index />} />
                <Route path='/login' element={<Login />} />
                <Route path='/customers' element={<AllCustomers />} />
                <Route path='/producers' element={<AllProducts />} />
                <Route path='/customer' element={<Customer />} />
                <Route path='/producer' element={<Producer />} />
                <Route path='/admin' element={<Admin />} />
                <Route path='/signup' element={<Signup />} />
                <Route path='/profile' element={<Profile />} />
            </Routes>
        </BrowserRouter>
    );
}

export default RoutesList;
