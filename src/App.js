import { useEffect } from 'react';
import {BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';

import './App.css';
import SignUp from './modules/sign-up/SignUp'
import SignIn from './modules/sign-in/SignIn';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import LandingPage from './modules/landingPage/LandingPage';
import Layout from './common/layout/Layout';
import Dashboard from './modules/dashboard/Dashboard';
import ProductOrders from './modules/product-order/OrderList';
import Checkout from './modules/delivery/Checkout';
import UserAccount from './modules/account/AccountPage';
import FeedBackPage from './modules/feedback/FeedBackPage';
import SettingsTable from './modules/settings/Settings';
import { getFromLocalStorage, removeItem } from './common/utils/LocalStorage';


const IDLE_TIME_LIMIT = 5 * 60 * 1000;

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    let idleTimer = null;

    // Function to handle idle state
    const onIdle = () => {
      console.log('User is idle. Redirecting to sign-in page.');
      removeItem("user");
      navigate('/sign-in');
    };

    // Reset the timer when user interacts with the app
    const resetTimer = () => {
      clearTimeout(idleTimer);
      idleTimer = setTimeout(onIdle, IDLE_TIME_LIMIT);
    };

    // Event listeners for user actions
    window.addEventListener('mousemove', resetTimer);
    window.addEventListener('keydown', resetTimer);
    window.addEventListener('scroll', resetTimer);
    window.addEventListener('touchstart', resetTimer);

    // Set the initial timer
    idleTimer = setTimeout(onIdle, IDLE_TIME_LIMIT);

    // Cleanup function to remove event listeners
    return () => {
      clearTimeout(idleTimer);
      window.removeEventListener('mousemove', resetTimer);
      window.removeEventListener('keydown', resetTimer);
      window.removeEventListener('scroll', resetTimer);
      window.removeEventListener('touchstart', resetTimer);
    };
  }, [navigate]);

  const account = getFromLocalStorage('user');
  
  if (!account) {
   
    return <Navigate to="/sign-in" replace />;
  }
  
  return children;
};

function App() {

  return (
    
    <Router>
      <Routes>
      <Route
          path="/pweza/*"
          element={
            <ProtectedRoute>
              <Layout>
                <Routes>
                  <Route path="dashboard" element={<Dashboard />} />
                  <Route path="orders" element={<ProductOrders />} />
                  <Route path="delivery" element={<Checkout />} />
                  <Route path="account" element={<UserAccount />} />
                  <Route path="feedback" element={<FeedBackPage />} />  
                  <Route path="settings" element={<SettingsTable />} />                  
                </Routes>
              </Layout>
              </ProtectedRoute>
           
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
