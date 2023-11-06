import { NavLink } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import LogOut from "../components/LogOut.jsx"

const Header = () => {
    const [userRole, setUserRole] = useState('');
    const [userLoggedIn, setUserLoggedIn] = useState();
    
    useEffect(() => {
        // !! : sert pour convertir en booléen (undefined => false, <> undefined => true)
        setUserLoggedIn(!!sessionStorage.getItem('isLogged'));
    }, []);
    return (
        <header>
            <div className="headerDiv">
            <div className="headerDivDiv">
                <div className="headerDivButton">
                    <button id="dark-mode-toggle">Toggle Dark Mode</button>
                    {userRole === "admin" && (
                        <button className="adminButton">Users List</button>
                    )}
                    {userLoggedIn ? (
                         <NavLink to="/logout">
                            <button id="logout">Log Out</button>
                        </NavLink>
                    ) : (
                    <>
                        <NavLink to="/signup">
                                <button id="signUp">Sign Up</button>
                            </NavLink>
                            <NavLink to="/login">
                                <button id="login">Log in</button>
                            </NavLink>
                      </>       
                    )}
                    </div>
                    <div>
                        <NavLink to='/'>
                            <img id="headerLogo" src="./pictures/logo.png" alt="Logo Entreprise to Home" tabIndex="0" role="link" />
                        </NavLink>
                    </div>
                </div>
            </div>
            <h1 className="italic">Growing A Greener Future Together</h1>
            <nav>
                <ul>
                    <li><NavLink to='/about'>About Us</NavLink></li>
                    <li><NavLink to='/products'>Our Products</NavLink></li>
                    <li><NavLink to='/contact'>Contact Us</NavLink></li>
                </ul>
            </nav>
        </header>
    )
}

export default Header;