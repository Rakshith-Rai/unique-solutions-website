import React from 'react';
import { motion } from 'framer-motion';
import './Hero.css';
import backgroundImage from '../../assets/home-bg-min.jpg';

const Hero = () => {
  const [showScroll, setShowScroll] = React.useState(true);
  const [isClicked, setIsClicked] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShowScroll(false);
      } else {
        setShowScroll(true);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section id="home" className="hero">
      <div className="hero-background" style={{ backgroundImage: `url(${backgroundImage})` }}>
        <div className="overlay"></div>
      </div>

      <div className="container hero-container">
        <motion.div
          className="hero-content"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div
            className="logo-container"
            onClick={() => setIsClicked(!isClicked)}
          >
            <img
              src={`${process.env.PUBLIC_URL}/logo.png`}
              alt="Unique Solutions"
              className="hero-logo"
            />
          </div>

          <motion.div
            className="hero-tagline"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <span className="highlight-blue">Connect, Secure, Automate:</span>
            <span className="highlight-dark">Your Trusted Partner in Technology.</span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <strong>Stay connected and secure</strong> with our networking solutions. From <em>setup & configuration</em> to <em>ongoing maintenance & support</em>, we've got you covered.
          </motion.p>

          <div className="hero-buttons">
            <a
              href="#about"
              className="btn primary-btn"
            >
              Learn More
            </a>

            <a
              href="#contact"
              className="btn secondary-btn"
            >
              Contact Us
            </a>
          </div>
        </motion.div>
      </div>

      {showScroll && (
        <motion.div
          className="scroll-indicator"
          initial={{ opacity: 1 }}
          animate={{ opacity: showScroll ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        ></motion.div>
      )}
    </section>
  );
};

export default Hero;
