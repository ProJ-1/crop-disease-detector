// components/ScanAnimation.tsx
import React from 'react';
import { motion } from 'framer-motion';

const ScanAnimation: React.FC = () => {
  return (
    <motion.div
      className="absolute inset-0 pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Scanning Line */}
      <motion.div
        className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-green-400 to-transparent shadow-lg shadow-green-400/50"
        initial={{ top: '0%' }}
        animate={{ top: '100%' }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'easeInOut'
        }}
        style={{
          filter: 'blur(0.5px)'
        }}
      />
      
      {/* Glow Overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-green-400/10 via-transparent to-green-400/10"
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      
      {/* Corner Indicators */}
      <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-green-400"></div>
      <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-green-400"></div>
      <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-green-400"></div>
      <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-green-400"></div>
      
      {/* Pulse Effect */}
      <motion.div
        className="absolute inset-0 border-2 border-green-400 rounded-lg"
        animate={{ opacity: [0.3, 0.8, 0.3] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      />
    </motion.div>
  );
};

export default ScanAnimation;