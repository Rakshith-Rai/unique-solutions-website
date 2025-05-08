import React from 'react';
import { motion } from 'framer-motion';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import './Footer.css';
import logo from '../../assets/logo.png';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-logo">
            <img src={logo} alt="Unique Solutions Logo" />
            <p>Connect, Secure, Automate: Your Trusted Partner in Technology.</p>
            <div className="social-links">
              <a href="#" target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
              <a href="#" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
              <a href="#" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
              <a href="#" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
            </div>
          </div>

          <div className="footer-links">
            <h3>Quick Links</h3>
            <ul>
              <li><a href="#home">Home</a></li>
              <li><a href="#about">About Us</a></li>
              <li><a href="#services">Services</a></li>
              <li><a href="#clients">Clients</a></li>
              <li><a href="#partners">Partners</a></li>
              <li><a href="#contact">Contact Us</a></li>
            </ul>
          </div>

          <div className="footer-services">
            <h3>Our Services</h3>
            <ul>
              <li><a href="#services">CCTV Surveillance Systems</a></li>
              <li><a href="#services">Biometric Attendance</a></li>
              <li><a href="#services">EPABX & Intercom Systems</a></li>
              <li><a href="#services">Solar Systems</a></li>
              <li><a href="#services">Video Door Entry Systems</a></li>
              <li><a href="#services">Gate/Home Automation</a></li>
            </ul>
          </div>

          <div className="footer-contact">
            <h3>Contact Info</h3>
            <ul>
              <li>
                <FaPhone />
                <span>+91 7022524444</span>
              </li>
              <li>
                <FaEnvelope />
                <span>uniquesolutionsmlr@gmail.com</span>
              </li>
              <li>
                <FaMapMarkerAlt />
                <span>GROUND FLOOR, Embassy Plaza, opp. Indian Bank, Pumpwell, Mangaluru, Karnataka 575002</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {currentYear} Unique Solutions. All Rights Reserved.</p>
          <div className="footer-bottom-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>
        </div>
      </div>

      <motion.div
        className="back-to-top"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <i className="fas fa-arrow-up"></i>
      </motion.div>
    </footer>
  );
};

export default Footer;
