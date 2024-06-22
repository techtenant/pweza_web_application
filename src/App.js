import { useEffect } from 'react';
import {BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';

import './App.css';
import SignUp from './modules/sign-up/SignUp'
import SignIn from './modules/sign-in/SignIn';
import LandingPage from './modules/landingPage/LandingPage';
import Layout from './common/layout/Layout';
import Dashboard from './modules/dashboard/Dashboard';
import Packages from './modules/packages/Packages';
import BikeTypes from './modules/bikes/BikeTypes';
import Bikes from './modules/bikes/Bikes';
import DeliveryList from './modules/delivery/deliveryList';
import PaymentList from './modules/payments/payments';
import Checkout from './modules/payments/Checkout';
import NewDelivery from './modules/delivery/NewDelivery';
import UserAccount from './modules/account/AccountPage';
import ProductList from './modules/product/Product';
import CreateProduct from './modules/product/CreateProduct';
import FeedBackPage from './modules/feedback/FeedBackPage';
import SettingsTable from './modules/settings/Settings';
import OrderTrackingPage from './modules/orderTracking/OrderTrackingPage';
import NotificationsList from './modules/rider/notifications/Notifications';

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
                  <Route path="packages" element={<Packages />} />
                  <Route path="biketypes" element={<BikeTypes />} />
                  <Route path="bikes" element={<Bikes />} />
                  <Route path="delivery" element={<DeliveryList />} />
                  <Route path="account" element={<UserAccount />} />
                  <Route path="feedback" element={<FeedBackPage />} />  
                  <Route path="settings" element={<SettingsTable />} />  
                  <Route path="checkout" element={<NewDelivery />} />     
                  <Route path="products" element={<ProductList />} />     
                  <Route path="newProduct" element={<CreateProduct />} />  
                  <Route path="payment" element={<PaymentList />} />  
                  <Route path="paymentcheckout" element={<Checkout />} /> 
                  <Route path ="orderTracking" element={< OrderTrackingPage/>} />
                  <Route path ="notifications" element={< NotificationsList/>} />                
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
