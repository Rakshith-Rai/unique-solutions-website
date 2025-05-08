import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import './Clients.css';

// Using a placeholder image for all clients
import placeholderLogo from '../../assets/logo.png';

const ClientCard = ({ logo, name, description, index }) => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <motion.div
      className="client-card"
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -10, boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)' }}
    >
      <div className="client-logo">
        <img src={logo} alt={name} />
      </div>
      <div className="client-info">
        <h3>{name}</h3>
        <span>{description}</span>
      </div>
    </motion.div>
  );
};

const Clients = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const clients = [
    {
      logo: placeholderLogo,
      name: "Campco Ltd",
      description: "Chocolate Manufacturers"
    },
    {
      logo: placeholderLogo,
      name: "St. Aloysius",
      description: "Educational Institute"
    },
    {
      logo: placeholderLogo,
      name: "MRPL",
      description: "Oil & Energy"
    },
    {
      logo: placeholderLogo,
      name: "Sharada College",
      description: "Educational Institute"
    },
    {
      logo: placeholderLogo,
      name: "KMC Mangalore",
      description: "Hospital"
    },
    {
      logo: placeholderLogo,
      name: "Tandoor Express",
      description: "Restaurant"
    },
    {
      logo: placeholderLogo,
      name: "Pallkhi",
      description: "Restaurant"
    },
    {
      logo: placeholderLogo,
      name: "ISPRL",
      description: "Oil Storage & Infrastructure"
    }
  ];

  return (
    <section id="clients" className="clients">
      <div className="container">
        <motion.h2
          className="heading"
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          Our <span>Clients</span>
        </motion.h2>

        <div className="clients-container">
          {clients.map((client, index) => (
            <ClientCard
              key={index}
              logo={client.logo}
              name={client.name}
              description={client.description}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Clients;
