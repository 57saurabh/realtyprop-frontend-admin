// Navbar.js
import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './NavBar.css';
import UserContext from '../../Context/UserContext';

const Navbar = () => {
  const {logout} = useContext(UserContext)
  const navigate = useNavigate();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };
  const handleLogout = () => {
    logout();
    console.log('Logged out');
    navigate('/login')
};

  return (

    <nav>
      <div className="navbar-container">
        <Link to="/" className="logo">
          RealtyProp.in
        </Link>

        {/* Mobile View */}
        <div className="mobile-menu">
          <button className="menu-icon" onClick={toggleMobileMenu}>
            {isMobileMenuOpen ? '✕' : '☰'}
          </button>
          {/* Mobile menu items */}
          <div className={`mobile-menu-items ${isMobileMenuOpen ? 'open' : ''}`}>
            <Link to="/" onClick={toggleMobileMenu}>
              Home
            </Link>
            <Link  to="/coustmer" onClick={toggleMobileMenu}>
              Coustmer List
            </Link>
            <Link to="/queries" onClick={toggleMobileMenu}>
              Queries
            </Link>

            <div className="auth-buttons">
              <button  onClick={handleLogout} >Logout</button>
              {/* <Link to="/signup"></Link> */}
            </div>
              

          </div>
        </div>

        {/* Web View */}
        <div className="web-menu">
        <Link to="/" onClick={toggleMobileMenu}>
              Home
            </Link>
            <Link  to="/coustmer" onClick={toggleMobileMenu}>
              Coustmer List
            </Link>
            <Link to="/queries" onClick={toggleMobileMenu}>
              Queries
            </Link>
            <div className="auth-buttons">
              <button  onClick={handleLogout} >Logout</button>
              {/* <Link to="/signup"></Link> */}
            </div>
            
        </div>
      </div>
    </nav>
  );
};


export default Navbar;
