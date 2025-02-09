import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from '@mui/material';

import Navbar from './components/Navbar'; // Import Navbar
import Home from './pages/Home';
import Products from './pages/Products';
import CartPage from './pages/CartPage';
import Checkout from './pages/Checkout';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Profile from './pages/Profile';
import CheckoutAddress from './pages/CheckoutAddress';
import PaymentPage from './pages/PaymentPage';
import OrderSummary from './pages/OrderSummary';
import OrderHistory from './pages/OrderHistory';

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
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="checkout/address" element={<CheckoutAddress/>} />
            <Route path="checkout/payment" element={<PaymentPage/>} />
            <Route path="order/summary" element={<OrderSummary/>} />
            <Route path="order/history" element={<OrderHistory/>} />
          </Routes>
        </Container>
      </div>
    </Router>
  );
};

export default App;
