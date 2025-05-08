import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import './About.css';
import aboutImage from '../../assets/about-im.jpg';
import AnimatedBackground from '../AnimatedBackground/AnimatedBackground';

const About = () => {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  return (
    <section id="about" className="about">
      <AnimatedBackground variant="about" />
      <div className="container">
        <h2 className="heading" ref={ref}>
          <span>About</span> Us
        </h2>

        <motion.div
          className="about-container"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <motion.div
            className="about-image"
            variants={itemVariants}
          >
            <img src={aboutImage} alt="About Unique Solutions" />
            <div className="image-overlay">
              <h3>Best Technology Partners</h3>
            </div>
            <div className="image-shape"></div>
          </motion.div>

          <motion.div
            className="about-content"
            variants={itemVariants}
          >
            <div className="about-badge">Trusted Technology Partner</div>
            <h3>Why Choose Us?</h3>
            <p>
              In today's fast-paced digital landscape, staying ahead of the curve is essential.
              At Unique Solutions, we understand the challenges businesses face and are here to provide the solutions you need to succeed.
              Whether you're looking to enhance your network infrastructure, safeguard your assets with state-of-the-art security systems,
              or streamline your operations with cloud computing, we have the expertise and experience to make it happen.
              Partner with us and unlock the full potential of your business.
            </p>

            <div className="about-features">
              <div className="feature-item">
                <div className="feature-icon">
                  <i className="fas fa-check-circle"></i>
                </div>
                <div className="feature-text">Expert Team</div>
              </div>
              <div className="feature-item">
                <div className="feature-icon">
                  <i className="fas fa-check-circle"></i>
                </div>
                <div className="feature-text">Quality Service</div>
              </div>
              <div className="feature-item">
                <div className="feature-icon">
                  <i className="fas fa-check-circle"></i>
                </div>
                <div className="feature-text">Innovative Solutions</div>
              </div>
            </div>

            <motion.a
              href="#services"
              className="btn primary-btn"
              whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(25, 96, 162, 0.3)" }}
              whileTap={{ scale: 0.95 }}
            >
              Our Services
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
