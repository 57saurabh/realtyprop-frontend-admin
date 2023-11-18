// Footer.js
import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import logo from '../utils/asset/logo.jpg'; // Replace with the actual path to your logo image
import './Footer.css';

const locations = ['Indrapurema', 'Example City', 'Another Location', 'More Locations']; // Add your actual locations

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="logofooter">
          <img src={logo} alt="Logo" />
        </div>
        <div className="quick-links">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/properties">Properties</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>
        <div className="social-media">
          <h4>Connect with Us</h4>
          <div className="social-icons">
            <a href="https://www.facebook.com"><FaFacebook /></a>
            <a href="https://www.twitter.com"><FaTwitter /></a>
            <a href="https://www.instagram.com"><FaInstagram /></a>
            <a href="https://www.linkedin.com"><FaLinkedin /></a>
          </div>
        </div>
        <div className="locations">
          <h4>Locations</h4>
          <ul>
            {locations.map((location, index) => (
              <li key={index}>{location}</li>
            ))}
          </ul>
        </div>
        <div className="legal">
          <h4>Legal Information</h4>
          <ul>
            <li><a href="/terms-of-service">Terms of Service</a></li>
            <li><a href="/privacy-policy">Privacy Policy</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
