import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';
import { Code, Terminal, Monitor, Globe } from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const BackgroundEffect = () => (
  <div className="absolute inset-0 overflow-hidden flex items-center justify-center">
    <div className="absolute w-[150%] h-[150%] bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 animate-bg-flow opacity-50" />
    <div className="absolute w-[120%] h-[120%] bg-gradient-to-br from-purple-500 via-pink-500 to-purple-500 animate-bg-glow opacity-40" />
  </div>
);

const IconButton = ({ Icon }) => (
  <div className="relative group hover:scale-125 transition-transform duration-500 animate-pulse">
    <div className="absolute -inset-2 bg-gradient-to-r from-pink-600 to-purple-600 rounded-full blur opacity-50 group-hover:opacity-100 transition duration-300" />
    <div className="relative p-3 bg-black/50 backdrop-blur-sm rounded-full border border-white/10">
      <Icon className="w-6 h-6 text-white" />
    </div>
  </div>
);
IconButton.propTypes = {
  Icon: PropTypes.elementType.isRequired,
};

const WelcomeScreen = ({ onLoadingComplete }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [triggerSnap, setTriggerSnap] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 1000, once: false, mirror: false });

    const snapTimer = setTimeout(() => {
      setTriggerSnap(true);
    }, 3000);

    const exitTimer = setTimeout(() => {
      setIsVisible(false); // triggers AnimatePresence exit
      setTimeout(() => {
        onLoadingComplete?.(); // call after animation ends
      }, 1200);
    }, 4500);

    return () => {
      clearTimeout(snapTimer);
      clearTimeout(exitTimer);
    };
  }, [onLoadingComplete]);

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.div
          key="welcome-screen"
          className="fixed inset-0 bg-black z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.2 }}
          transition={{ duration: 1.2, ease: 'easeInOut' }}
        >
          <BackgroundEffect />

          <div className="relative min-h-screen flex items-center justify-center px-4">
            <div className="w-full max-w-4xl mx-auto text-center">
              <motion.div className="flex justify-center gap-4 mb-10">
                {[Code, Terminal, Monitor].map((Icon, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.5, delay: index * 0.2 }}
                  >
                    <IconButton Icon={Icon} />
                  </motion.div>
                ))}
              </motion.div>

              <motion.h1
                className="text-5xl font-bold text-white"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 1.2, opacity: 0 }}
                transition={{ duration: 1, ease: 'easeOut' }}
              >
                {"Welcome to My Virtual Showcase".split('').map((char, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 1 }}
                    animate={triggerSnap ? {
                      opacity: 0,
                      rotateY: 360,
                      y: -50,
                      x: Math.random() * 100 - 50,
                      scale: 0.5,
                      filter: "blur(4px)",
                    } : {}}
                    transition={{ duration: 1, delay: index * 0.05 }}
                    className="inline-block"
                  >
                    {char === ' ' ? '\u00A0' : char}
                  </motion.span>
                ))}
              </motion.h1>

              <motion.div
                className="mt-6"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.1 }}
                transition={{ duration: 0.8 }}
              >
                <a
                  href="https://www.souresh.mondal.id"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-neon-pink text-white hover:scale-105 transition-transform duration-300 animate-pulse"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Globe className="w-5 h-5 text-white" />
                  www.souresh.mondal.id
                </a>
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

WelcomeScreen.propTypes = {
  onLoadingComplete: PropTypes.func,
};

export default WelcomeScreen;
