import React from 'react';
import "../Stylesheets/Footer.css";
import { Link } from 'react-router-dom';
const Footer = () => {
  return (
    <footer className="bg-footer">
      <div className="footercontainer">
        <div className="footer-content">
          <div className="footer-section">
            <h6 className="footer-heading">Our Company</h6>
            <ul className="footer-link">
              <li><Link to="/Aboutus">About Us</Link></li>
              <li><Link to="#">Our Team</Link></li>
              <li><Link to="/Privacy Policy">Blog</Link></li>
            </ul>
          </div>
          <div className="footer-section">
            <h6 className="footer-heading">Services</h6>
            <ul className="footer-link">
              <li><Link to="#">Medicine</Link></li>
              <li><Link to="#">Healthcare Products</Link></li>
              <li><Link to="#">Skin Care Products</Link></li>
              <li><Link to="#">Diabetic Prodducts</Link></li>
            </ul>
          </div>
          <div className="footer-section">
            <h6 className="footer-heading">Help</h6>
            <ul className="footer-link">
              <li><Link to="/profile">Sign Up &amp;Login</Link></li>
              <li><Link to="/Privacy Policy">Privacy Policy</Link></li>
              <li><Link to="#">Terms &amp; Conditions</Link></li>
              <li><Link to="/helpcenter and faqs">Faq</Link></li>
            </ul>
          </div>
          <div className="footer-section">
            <h6 className="footer-heading">Contact Us</h6>
            <p className="contact-info">Contact us if you need help with anything</p>
            <p className="contact-info">+01 123-456-7890</p>
            <div className="footer-social">
              <a href="#" className="footer-social-icon facebook"><i className="fab fa-facebook-f"></i></a>
              <a href="#" className="footer-social-icon twitter"><i className="fab fa-twitter"></i></a>
              <a href="#" className="footer-social-icon google"><i className="fab fa-google"></i></a>
            </div>
          </div>
        </div>
        <p className="footer-alt">2024 © Pharmpe, All Rights Reserved</p>
      </div>
    </footer>
  );
}

export default Footer;
