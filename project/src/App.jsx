import React from 'react'
import HomePage from './Components/HomePage'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from './Components/SignUp.jsx';
import { Login } from './Components/Login.jsx';


const App = () => {
  return (
     <BrowserRouter>
      <Routes>
     <Route path='/' element= {<HomePage/>}/> 
     <Route path='/signup' element= {<SignUp/>}/> 
     <Route path='/login' element={<Login/>}/> 
     <Route path="/verify-otp" element={<OtpVerification />} />
      </Routes>
    </BrowserRouter>

     )
};

export default App