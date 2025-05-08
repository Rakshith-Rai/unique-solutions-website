import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes, FaUser } from 'react-icons/fa';
import './Header.css';
import logo from '../../assets/logo.png';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navVariants = {
    hidden: {
      opacity: 0,
      y: -20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeInOut',
      },
    },
  };

  const mobileMenuVariants = {
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        ease: 'easeInOut',
      },
    },
    open: {
      opacity: 1,
      height: 'auto',
      transition: {
        duration: 0.3,
        ease: 'easeInOut',
      },
    },
  };

  return (
    <header className={scrolled ? 'header scrolled' : 'header'}>
      <div className="container header-container">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="logo-container"
        >
          <a href="#home" className="logo">
            <img src={logo} alt="Unique Solutions Logo" />
          </a>
        </motion.div>

        <div className="menu-toggle" onClick={toggleMenu}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </div>

        <motion.nav
          className="desktop-nav"
          variants={navVariants}
          initial="hidden"
          animate="visible"
        >
          <a href="#home">Home</a>
          <a href="#about">About Us</a>
          <a href="#services">Services</a>
          <a href="#contact">Contact Us</a>
          <div className="nav-icons">
            <a href="#login" className="user-icon">
              <FaUser />
            </a>
          </div>
        </motion.nav>

        <AnimatePresence>
          {isOpen && (
            <motion.nav
              className="mobile-nav"
              variants={mobileMenuVariants}
              initial="closed"
              animate="open"
              exit="closed"
            >
              <a href="#home" onClick={toggleMenu}>Home</a>
              <a href="#about" onClick={toggleMenu}>About Us</a>
              <a href="#services" onClick={toggleMenu}>Services</a>
              <a href="#contact" onClick={toggleMenu}>Contact Us</a>
              <a href="#login" onClick={toggleMenu} className="user-link">
                <FaUser /> Login
              </a>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;
