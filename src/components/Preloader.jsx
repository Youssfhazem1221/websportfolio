import React from 'react';
import { motion } from 'framer-motion';

const Preloader = () => {
  return (
    <motion.div
      className="preloader"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } }}
    >
      <div className="preloader-content">
        <motion.div
          className="preloader-orbit"
          animate={{ rotate: 360, scale: [1, 1.1, 1] }}
          transition={{ 
            rotate: { duration: 3, repeat: Infinity, ease: 'linear' },
            scale: { duration: 2, repeat: Infinity, ease: 'easeInOut' }
          }}
        >
          <div className="preloader-sat"></div>
          <div className="preloader-pulse"></div>
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 10, letterSpacing: '0.2em' }}
          animate={{ opacity: [0, 1, 0.5, 1], y: 0, letterSpacing: '0.4em' }}
          transition={{ duration: 1.5, repeat: Infinity, repeatType: 'reverse' }}
          className="preloader-text"
        >
          LOADING
        </motion.h1>
      </div>
    </motion.div>
  );
};

export default Preloader;
