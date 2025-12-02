import React from 'react'
import HomePage from './Components/HomePage'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from './Components/SignUp.jsx';
import { Login } from './Components/Login.jsx';
import OtpVerification from './Components/OtpVerification';
import Dashboard from './Components/Dashboard';


const App = () => {
  return (
     <BrowserRouter>
      <Routes>
     <Route path='/' element= {<HomePage/>}/> 
     <Route path='/signup' element= {<SignUp/>}/> 
     <Route path='/login' element={<Login/>}/> 
     <Route path="/verify-otp" element={<OtpVerification />} />
     <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
     )
};

export default App