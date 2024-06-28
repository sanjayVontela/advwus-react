import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from "./Login";
import Index from "./Index";
import AllCustomers from './AllCustomers';
import AllProducts from './AllProducts';
import Customer from './Customer';
import Producer from './Producer';
import Admin from './Admin';

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
            </Routes>
        </BrowserRouter>
    );
}

export default RoutesList;
