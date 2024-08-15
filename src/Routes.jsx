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
import Chat from './components/Chat';
import AddProduct from './AddProduct';
import OwnProducts from './OwnProducts';
import Wishlist from './Wishlist'
import EditProduct from './editProduct';
import Logout from './Logout';
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";


const RoutesList = () => {
    const darkTheme = createTheme({
        palette: {
          mode:  'dark',
        },
      });
    
    return (
        <ThemeProvider theme={darkTheme}>
      <CssBaseline />
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
                <Route path='/chat/:id' element={<Chat />} />
                <Route path='/addProduct' element={<AddProduct />} />
                <Route path='/ownProducts' element={<OwnProducts />} />
                <Route path='/wishlist' element={<Wishlist />} />
                <Route path='/editProduct/:id' element={<EditProduct />} />
                <Route path='/logout' element={<Logout />} />
            </Routes>
        </BrowserRouter>
        </ThemeProvider>
    );
}

export default RoutesList;
