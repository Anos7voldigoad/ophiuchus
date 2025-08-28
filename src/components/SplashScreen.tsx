import React, { useEffect } from "react";
import { motion } from "framer-motion";
import splashImage from '../assets/ophiuschus.png';

interface SplashScreenProps {
  onFinish: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  useEffect(() => {
    console.log('SplashScreen mounted - should be visible');
    
    // Simple timer to finish splash
    const timer = setTimeout(() => {
      console.log('SplashScreen finishing');
      onFinish();
    }, 6000); // Increased by 2s for longer reveal
    
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-[#051F20] via-[#0B2B26] to-[#163832] z-50"
      initial={{ opacity: 1 }}
      exit={{ 
        opacity: 0,
        scale: 1.1,
        transition: { 
          duration: 1.5,
          ease: [0.25, 0.46, 0.45, 0.94] // Custom easing for smooth exit
        }
      }}
    >
      {/* Subtle background texture */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(218,241,222,0.1)_0%,transparent_50%)]" />
      </div>

      {/* Main content container - everything centered and unified */}
      <motion.div
        className="relative z-10 text-center flex flex-col items-center justify-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ 
          opacity: 1,
          y: 0,
          transition: { 
            duration: 1.4,
            ease: "easeOut"
          }
        }}
        exit={{
          opacity: 0,
          y: -30,
          scale: 0.95,
          transition: {
            duration: 1.2,
            ease: [0.25, 0.46, 0.45, 0.94]
          }
        }}
      >
        {/* Main image with natural proportions */}
        <motion.div
          className="relative mb-8 w-48 h-60 md:w-64 md:h-80"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ 
            scale: 1,
            opacity: 1,
            transition: { 
              duration: 1.5,
              ease: "easeOut",
              delay: 0.3
            }
          }}
          exit={{
            scale: 0.9,
            opacity: 0,
            transition: {
              duration: 1.0,
              ease: [0.25, 0.46, 0.45, 0.94]
            }
          }}
        >
          <motion.img
            src={splashImage}
            alt="Ophiuschus"
            className="absolute inset-0 h-full w-full object-contain drop-shadow-[0_0_30px_rgba(218,241,222,0.6)]"
            onLoad={() => {
              console.log('Image loaded successfully');
            }}
            onError={(e) => {
              console.error('Image failed to load:', e);
              // Fallback to text if image fails
              e.currentTarget.style.display = 'none';
            }}
          />
          
          {/* Single elegant ring that matches image size */}
          <motion.div
            className="absolute inset-0 border border-[#8EB69B]/30 rounded-full"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ 
              scale: [0.8, 1.2, 0.8],
              opacity: [0, 0.3, 0],
              transition: { 
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1.5
              }
            }}
          />
        </motion.div>

        {/* Title with perfect spacing */}
        <motion.h1
          className="text-3xl md:text-4xl font-light text-white/90 mb-2 tracking-wide"
          initial={{ opacity: 0, y: 10 }}
          animate={{ 
            opacity: 1,
            y: 0,
            transition: { 
              duration: 1,
              ease: "easeOut",
              delay: 0.8
            }
          }}
          exit={{
            opacity: 0,
            y: -20,
            transition: {
              duration: 0.8,
              ease: [0.25, 0.46, 0.45, 0.94]
            }
          }}
        >
          Ophiuschus
        </motion.h1>
        
        {/* Subtitle */}
        <motion.p
          className="text-white/60 text-lg font-light tracking-wider mb-2"
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: 1,
            transition: { 
              duration: 1,
              ease: "easeOut",
              delay: 1.2
            }
          }}
          exit={{
            opacity: 0,
            y: -15,
            transition: {
              duration: 0.6,
              ease: [0.25, 0.46, 0.45, 0.94]
            }
          }}
        >
          Welcome
        </motion.p>
        
        {/* "AI that transforms" tagline */}
        <motion.p
          className="text-white/50 text-base font-light tracking-wide"
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: 1,
            transition: { 
              duration: 1,
              ease: "easeOut",
              delay: 1.6
            }
          }}
          exit={{
            opacity: 0,
            y: -10,
            transition: {
              duration: 0.4,
              ease: [0.25, 0.46, 0.45, 0.94]
            }
          }}
        >
          AI that transforms
        </motion.p>
      </motion.div>

      {/* Simple bottom indicator */}
      <motion.div
        className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: 0.6,
          transition: { 
            duration: 1,
            ease: "easeOut",
            delay: 2.0
          }
        }}
        exit={{
          opacity: 0,
          scale: 0.8,
          transition: {
            duration: 0.5,
            ease: [0.25, 0.46, 0.45, 0.94]
          }
        }}
      >
        <div className="w-1 h-8 bg-gradient-to-b from-[#8EB69B]/40 to-transparent rounded-full" />
      </motion.div>
    </motion.div>
  );
};

export default SplashScreen;
     