import { useEffect } from 'react';
import {BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';

import './App.css';
import SignUp from './modules/sign-up/SignUp'
import SignIn from './modules/sign-in/SignIn';
import LandingPage from './modules/landingPage/LandingPage';
import Layout from './common/layout/Layout';
import Dashboard from './modules/dashboard/Dashboard';
import ProductOrders from './modules/product-order/OrderList';
import Checkout from './modules/delivery/Checkout';
import UserAccount from './modules/account/AccountPage';
import FeedBackPage from './modules/feedback/FeedBackPage';


function App() {

  return (
    <Router>
      <Routes>
      <Route
          path="/pweza/*"
          element={
           
              <Layout>
                <Routes>
                  <Route path="dashboard" element={<Dashboard />} />
                  <Route path="orders" element={<ProductOrders />} />
                  <Route path="delivery" element={<Checkout />} />
                  <Route path="account" element={<UserAccount />} />
                  <Route path="feedback" element={<FeedBackPage />} />
                  
                </Routes>
              </Layout>
           
          }
        />
        <Route path="/" element={<LandingPage />} />
        <Route path="sign-in" element={<SignIn />} />
        <Route path="sign-up" element={<SignUp />} />
        
      </Routes>
    </Router>
  );
}


export default App;
