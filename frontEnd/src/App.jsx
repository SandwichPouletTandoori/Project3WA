import React, { useState, useEffect } from 'react';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home.jsx"
import SignUp from "./pages/SignUp.jsx"
import LogIn from "./components/LogIn.jsx"
import LogOut from "./components/LogOut.jsx"
import Products from "./pages/Products.jsx"
import Contact from "./pages/Contact.jsx"
import About from "./pages/About.jsx"
import ListUsers from "./pages/ListUsers.jsx"
import Error404 from "./pages/Error404.jsx"

import Header from "./components/Header.jsx"
import Footer from "./components/Footer.jsx"
import DarkModeToggle from "./components/DarkModeToggle.jsx"

function App() {
  const [userRole, setUserRole] = useState('');
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  

  
  useEffect(() => {
    const userLoggedIn = !!sessionStorage.getItem('isLogged');// Convertion en booléen (undefined => false, <> undefined => true)
    setUserLoggedIn(userLoggedIn);
  }, []);
  
    return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:productId" element={<Products/>}/>
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<Error404 />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/logout" element={<LogOut />} />
          <Route path="/users" element={<ListUsers />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App