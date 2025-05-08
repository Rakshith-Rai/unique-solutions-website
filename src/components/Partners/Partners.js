import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import './Partners.css';

// Using a placeholder image for all partners
import placeholderLogo from '../../assets/logo.png';

const Partners = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const sliderRef = useRef(null);

  useEffect(() => {
    const slider = sliderRef.current;
    let isDown = false;
    let startX;
    let scrollLeft;

    const handleMouseDown = (e) => {
      isDown = true;
      slider.classList.add('active');
      startX = e.pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
    };

    const handleMouseLeave = () => {
      isDown = false;
      slider.classList.remove('active');
    };

    const handleMouseUp = () => {
      isDown = false;
      slider.classList.remove('active');
    };

    const handleMouseMove = (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - slider.offsetLeft;
      const walk = (x - startX) * 2; // Scroll speed
      slider.scrollLeft = scrollLeft - walk;
    };

    if (slider) {
      slider.addEventListener('mousedown', handleMouseDown);
      slider.addEventListener('mouseleave', handleMouseLeave);
      slider.addEventListener('mouseup', handleMouseUp);
      slider.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      if (slider) {
        slider.removeEventListener('mousedown', handleMouseDown);
        slider.removeEventListener('mouseleave', handleMouseLeave);
        slider.removeEventListener('mouseup', handleMouseUp);
        slider.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, []);

  const partners = [
    { logo: placeholderLogo, name: "Matrix" },
    { logo: placeholderLogo, name: "Avast" },
    { logo: placeholderLogo, name: "AVG" },
    { logo: placeholderLogo, name: "Dell" },
    { logo: placeholderLogo, name: "Intel" },
    { logo: placeholderLogo, name: "Lenovo" },
    { logo: placeholderLogo, name: "HP" },
    { logo: placeholderLogo, name: "Kaspersky" },
    { logo: placeholderLogo, name: "McAfee" },
    { logo: placeholderLogo, name: "Microsoft" },
    { logo: placeholderLogo, name: "SanDisk" }
  ];

  return (
    <section id="partners" className="partners">
      <div className="container">
        <motion.h2
          className="heading"
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          Our <span>Partners</span>
        </motion.h2>

        <motion.div
          className="partners-slider-container"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="partners-slider" ref={sliderRef}>
            {partners.map((partner, index) => (
              <div className="partner-item" key={index}>
                <img src={partner.logo} alt={partner.name} />
              </div>
            ))}
          </div>
          <div className="slider-instructions">
            <span>← Drag to Explore →</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Partners;
