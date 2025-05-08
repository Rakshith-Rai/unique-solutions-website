import React from 'react';
import { motion } from 'framer-motion';
import './Loader.css';
import logo from '../../assets/logo.png';

const Loader = () => {
  return (
    <div className="loader">
      <motion.div 
        className="loader-content"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.img 
          src={logo} 
          alt="Unique Solutions Logo"
          animate={{ 
            y: [0, -20, 0],
            rotateY: [0, 360]
          }}
          transition={{ 
            y: { repeat: Infinity, duration: 2, ease: "easeInOut" },
            rotateY: { duration: 2, ease: "easeInOut" }
          }}
        />
        <motion.div 
          className="loading-bar"
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          Loading amazing technology solutions...
        </motion.p>
      </motion.div>
    </div>
  );
};

export default Loader;
