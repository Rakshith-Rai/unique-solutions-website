import React from 'react';
import { motion } from 'framer-motion';
import './AnimatedBackground.css';

const AnimatedBackground = ({ variant = 'default' }) => {
  // Generate random positions for the floating elements
  const generateElements = (count) => {
    const elements = [];
    for (let i = 0; i < count; i++) {
      elements.push({
        id: i,
        size: Math.random() * 5 + 1, // 1-6rem
        x: Math.random() * 100, // 0-100%
        y: Math.random() * 100, // 0-100%
        duration: Math.random() * 20 + 10, // 10-30s
        delay: Math.random() * 5,
      });
    }
    return elements;
  };

  const floatingElements = generateElements(15);
  const smallElements = generateElements(20);

  return (
    <div className={`animated-background ${variant}`}>
      {/* Larger floating elements */}
      {floatingElements.map((element) => (
        <motion.div
          key={`float-${element.id}`}
          className="floating-element"
          style={{
            width: `${element.size}rem`,
            height: `${element.size}rem`,
            left: `${element.x}%`,
            top: `${element.y}%`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, 15, 0],
            rotate: [0, 360],
          }}
          transition={{
            duration: element.duration,
            delay: element.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Smaller particles */}
      {smallElements.map((element) => (
        <motion.div
          key={`particle-${element.id}`}
          className="particle-element"
          style={{
            width: `${element.size / 3}rem`,
            height: `${element.size / 3}rem`,
            left: `${element.x}%`,
            top: `${element.y}%`,
          }}
          animate={{
            y: [0, -20, 0],
            x: [0, 10, 0],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: element.duration / 2,
            delay: element.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Gradient overlay */}
      <div className="gradient-overlay"></div>
    </div>
  );
};

export default AnimatedBackground;
