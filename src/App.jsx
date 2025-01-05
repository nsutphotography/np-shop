import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from '@mui/material';

import Navbar from './components/Navbar'; // Import Navbar
import Home from './pages/Home';
import Products from './pages/Products';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Profile from './pages/Profile';
import CheckoutAddress from './pages/CheckoutAddress';

const App = () => {
  return (
    <Router>
      <div>
        {/* Navbar */}
        <Navbar />

        {/* Main Content */}
        <Container sx={{ marginTop: 4 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="checkout/address" element={<CheckoutAddress/>} />
          </Routes>
        </Container>
      </div>
    </Router>
  );
};

export default App;
