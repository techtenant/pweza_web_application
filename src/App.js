import { useEffect } from 'react';
import {BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';

import './App.css';
import SignUp from './modules/sign-up/SignUp'
import SignIn from './modules/sign-in/SignIn';
import LandingPage from './modules/landingPage/LandingPage';



function App() {

  return (
    <Router>
      <Routes>
       
        <Route path="/" element={<LandingPage />} />
        <Route path="sign-in" element={<SignIn />} />
        <Route path="sign-up" element={<SignUp />} />
        
      </Routes>
    </Router>
  );
}


export default App;
