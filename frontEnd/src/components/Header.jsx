import { NavLink } from "react-router-dom";

const Header = () => {
    return(
        <header>
            <div className="headerDiv">
                <div>
                    <button id="dark-mode-toggle">Toggle Dark Mode</button>
                </div>
                <div>
                    <NavLink to='/'><img id="headerLogo" src="https://img.pikbest.com/png-images/mordan-agriculture-vector-logo-design_5521578.png!f305cw" alt="Logo Entreprise to Home"/></NavLink>
                </div>
                <div>
                    <NavLink to='/signup'><button id="signUp">Sign Up</button></NavLink>
                    <NavLink to='/login'><button id="login">Log in</button></NavLink>
                </div>
            </div>
            <h1>Growing A Greener Future Together</h1>
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

export default Header