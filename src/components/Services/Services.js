import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaVideo, FaFingerprint, FaPhone, FaSun, FaDoorOpen, FaHome, FaPrint, FaBatteryFull, FaTimes, FaCheck, FaShieldAlt, FaBuilding, FaHome as FaHouse, FaUserTie } from 'react-icons/fa';
import './Services.css';
import AnimatedBackground from '../AnimatedBackground/AnimatedBackground';

// Import service images
import cctvImage from '../../assets/cctv-min.jpg';
import biometricsImage from '../../assets/biometrics-min.jpg';
import intercomImage from '../../assets/intercom-min.jpg';
import solarImage from '../../assets/solar-min.jpg';
import vdeImage from '../../assets/vde-min.jpg';
import gateImage from '../../assets/gate.jpg';
import printerImage from '../../assets/logo.png'; // Using logo as placeholder
import inverterImage from '../../assets/inverter.jpg';

// Service Card Component
const ServiceCard = ({ title, image, description, icon, color, index, isFeatured = false, details }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <>
      <motion.div
        className={`service-card ${isFeatured ? 'featured-service' : ''}`}
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{
          y: -10,
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
          transition: { duration: 0.3 }
        }}
      >
        {isFeatured && (
          <div className="featured-badge">
            <span>Featured Service</span>
          </div>
        )}
        <div className="service-image">
          <img src={image} alt={title} />
          <div className="service-overlay"></div>
          <div className="service-icon" style={{ backgroundColor: color }}>
            {icon}
          </div>
        </div>
        <div className="service-content">
          <h3>{title}</h3>
          <p>{description}</p>
          <motion.div
            className="service-btn-container"
            initial={{ opacity: 0 }}
            animate={isHovered ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.button
              className="service-btn"
              whileHover={{ scale: 1.05, backgroundColor: color }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowDetails(true)}
            >
              Learn More
            </motion.button>
          </motion.div>
        </div>
      </motion.div>

      <AnimatePresence>
        {showDetails && (
          <motion.div
            className="service-details-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowDetails(false)}
          >
            <motion.div
              className="service-details-modal"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="close-modal" onClick={() => setShowDetails(false)}>
                <FaTimes />
              </button>
              <div className="modal-header" style={{ backgroundColor: color }}>
                <div className="modal-icon">{icon}</div>
                <h2>{title}</h2>
              </div>
              <div className="modal-content">
                {details ? (
                  <div className="service-details">
                    {details.description && <p className="details-description">{details.description}</p>}

                    {details.features && (
                      <div className="features-list">
                        <h3>Key Features</h3>
                        <ul>
                          {details.features.map((feature, idx) => (
                            <li key={idx}>
                              <FaCheck className="feature-icon" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {details.applications && (
                      <div className="applications-section">
                        <h3>Applications</h3>
                        <div className="applications-grid">
                          {details.applications.map((app, idx) => (
                            <div className="application-item" key={idx}>
                              <div className="application-icon">
                                {app.icon}
                              </div>
                              <h4>{app.title}</h4>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {details.contactCTA && (
                      <div className="contact-cta">
                        <p>{details.contactCTA}</p>
                        <a href="#contact" className="cta-button" onClick={() => setShowDetails(false)}>
                          Contact Us
                        </a>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="service-details">
                    <p className="details-description">
                      For more information about our {title} service, please contact us. Our team of experts will be happy to discuss your specific requirements and provide a customized solution.
                    </p>
                    <div className="contact-cta">
                      <a href="#contact" className="cta-button" onClick={() => setShowDetails(false)}>
                        Contact Us
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const Services = () => {
  const [ref] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const services = [
    {
      title: "CCTV Surveillance Systems",
      image: cctvImage,
      description: "Stay connected and secure with our networking solutions. From setup and configuration to ongoing maintenance and support, we've got you covered.",
      icon: <FaVideo />,
      color: "#1960A2",
      isFeatured: true,
      details: {
        description: "Our CCTV surveillance systems provide comprehensive security solutions for homes, businesses, and institutions. We offer end-to-end services including consultation, installation, maintenance, and monitoring to ensure your property is protected 24/7.",
        features: [
          "High-definition cameras with night vision capabilities",
          "Remote monitoring via smartphone or computer",
          "Motion detection and alert notifications",
          "Secure cloud storage options",
          "Weatherproof outdoor cameras",
          "Professional installation and setup",
          "Regular maintenance and support",
          "Customized solutions for different property sizes"
        ],
        applications: [
          { title: "Residential", icon: <FaHouse /> },
          { title: "Commercial", icon: <FaBuilding /> },
          { title: "Industrial", icon: <FaShieldAlt /> },
          { title: "Corporate", icon: <FaUserTie /> }
        ],
        contactCTA: "Ready to enhance your security? Contact us today for a free consultation and quote for your CCTV installation needs."
      }
    },
    {
      title: "Biometric Attendance",
      image: biometricsImage,
      description: "Secure your premises with advanced biometric attendance systems that provide accurate tracking and enhanced security.",
      icon: <FaFingerprint />,
      color: "#3a7ab8"
    },
    {
      title: "EPABX & Intercom Systems",
      image: intercomImage,
      description: "Enhance communication within your organization with our state-of-the-art intercom systems and EPABX solutions.",
      icon: <FaPhone />,
      color: "#154980"
    },
    {
      title: "Solar Systems",
      image: solarImage,
      description: "Harness the power of renewable energy with our solar system installations, reducing your carbon footprint and energy costs.",
      icon: <FaSun />,
      color: "#1960A2"
    },
    {
      title: "Video Door Entry Systems",
      image: vdeImage,
      description: "Enhance security at entry points with our video door entry systems, providing visual verification before granting access.",
      icon: <FaDoorOpen />,
      color: "#3a7ab8"
    },
    {
      title: "Gate/Home Automation Systems",
      image: gateImage,
      description: "Experience the convenience of automated gates and home systems that can be controlled remotely for enhanced security and comfort.",
      icon: <FaHome />,
      color: "#154980"
    },
    {
      title: "Printers & Laptops",
      image: printerImage,
      description: "Get the best hardware solutions for your business needs with our range of printers, laptops, and other IT equipment.",
      icon: <FaPrint />,
      color: "#1960A2"
    },
    {
      title: "Inverter & Battery",
      image: inverterImage,
      description: "Ensure uninterrupted power supply with our reliable inverter and battery solutions for homes and businesses.",
      icon: <FaBatteryFull />,
      color: "#3a7ab8"
    }
  ];

  return (
    <section id="services" className="services">
      <AnimatedBackground variant="services" />
      <div className="container">
        <div className="section-header" ref={ref}>
          <div className="section-badge">What We Offer</div>
          <h2 className="heading">
            Our <span>Services</span>
          </h2>
          <p className="section-subtitle">
            We provide comprehensive technology solutions to meet your business needs
          </p>
        </div>

        <div className="services-container">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              title={service.title}
              image={service.image}
              description={service.description}
              icon={service.icon}
              color={service.color}
              index={index}
              isFeatured={service.isFeatured}
              details={service.details}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
