import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import About from './components/About/About';
import Services from './components/Services/Services';
import Clients from './components/Clients/Clients';
import Partners from './components/Partners/Partners';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';
import Loader from './components/Loader/Loader';
import './App.css';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="app">
      <Header />
      <main>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Hero />
          <About />
          <Services />
          <Clients />
          <Partners />
          <Contact />
        </motion.div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
