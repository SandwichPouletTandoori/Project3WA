import { NavLink } from "react-router-dom";
import React, { useState, useEffect } from 'react';

const Header = (req, res) => {
    const [userRole, setUserRole] = useState('');
    const [userLoggedIn, setUserLoggedIn] = useState();
    const [darkMode, setDarkMode] = useState(false);
    const [menuVisible, setMenuVisible] = useState(false);
    const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    };

    useEffect(() => {
        setUserLoggedIn(!!sessionStorage.getItem('isLogged'));
        const roleFromSession = sessionStorage.getItem('role');
    setUserRole(roleFromSession);
    console.log("isLogged:", userLoggedIn);
    console.log("userRole from sessionStorage:", roleFromSession);
    }, []);
    
    useEffect(() => {
        setUserRole(sessionStorage.getItem('role'));
        console.log("userRole:", userRole);
    }, []);
    
     
    
    useEffect(() => {
        if (darkMode) {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
    }, [darkMode]);
    
    const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };
  
  const closeMenu = () => {
    setMenuVisible(false);
  };
    
    return (
        <header>
            <button id="buttonDarkMode" onClick={toggleDarkMode}>&#x2600;</button>
            <div className="displaySmall">
                <div className="burger-icon" onClick={toggleMenu}>&#9776;</div>
                <nav className={`burger-menu ${menuVisible ? 'visible' : ''}`}>
                    <ul id="burgerUl">
                        <li><NavLink to='/about' onClick={closeMenu}>About Us</NavLink></li>
                        <li><NavLink to='/products' onClick={closeMenu}>Our Products</NavLink></li>
                        <li><NavLink to='/contact' onClick={closeMenu}>Contact Us</NavLink></li>
                    </ul>
                    <ul>
                        {userRole === "admin" ? (
                            <li><button className="adminButton">Users List</button></li>
                            ) : (
                            <div></div>
                            )}
                        {userLoggedIn ? (
                            <li><NavLink to="/logout">Log Out</NavLink></li>
                            ) : (
                            <>
                            <li><NavLink to="/signup">Sign Up</NavLink></li>
                            <li><NavLink to="/login">Log in</NavLink></li>
                            </>       
                            )}
                    </ul>        
                </nav>
            </div>
            <div className="displayBig">
                {userRole === "admin" && (
                    <button className="adminButton">Users List</button>
                    )}
            {userLoggedIn ? (
            <>
            <p value={userRole}></p>
                <NavLink to="/logout">
                    <button id="logout">Log Out</button>
                </NavLink>
                </>
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
        <div className="headerDiv">
                        <NavLink to='/'>
                            <img id="headerLogo" src="./pictures/logo.png" alt="Logo Entreprise to Home" tabIndex="0" role="link" />
                        </NavLink>
        </div>
        <h1 className="italic">Growing A Greener Future <span className="underline">Together</span></h1>
        <nav id="navbar">
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