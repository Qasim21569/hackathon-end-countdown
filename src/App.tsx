import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useAnimate } from 'framer-motion';
import { Terminal, Sparkles, X } from 'lucide-react';

function App() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [showCompletion, setShowCompletion] = useState(false);
  const [hasSeenPopup, setHasSeenPopup] = useState(false);
  const [scope, animate] = useAnimate();

  useEffect(() => {
    // Set the end date to March 23, 2025 at 1 PM IST (7:30 UTC)
    const endDate = new Date('2025-03-23T07:30:00Z').getTime();
    const now = new Date().getTime();

    // If hackathon has ended, show completion popup immediately
    if (now > endDate && !hasSeenPopup) {
      setShowCompletion(true);
    }

    const updateTimer = () => {
      const currentTime = new Date().getTime();
      
      // If after end date, show 00:00:00
      if (currentTime > endDate) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      // Calculate remaining time
      const difference = endDate - currentTime;
      const hours = Math.floor(difference / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days: 0, hours, minutes, seconds });
    };

    updateTimer();
    const timer = setInterval(updateTimer, 1000);

    return () => clearInterval(timer);
  }, [hasSeenPopup]);

  // Close button handler
  const handleClosePopup = () => {
    setShowCompletion(false);
    setHasSeenPopup(true);
  };

  return (
    <motion.div 
      ref={scope}
      className="min-h-screen bg-black text-white overflow-hidden relative scanlines"
    >
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-[1px] h-[40%] bg-cyan-500/30 hidden sm:block"></div>
        <div className="absolute top-1/3 right-1/4 w-[1px] h-[30%] bg-red-500/30 hidden sm:block"></div>
        <div className="absolute bottom-1/4 left-1/3 w-[1px] h-[25%] bg-cyan-500/30 hidden sm:block"></div>
        <div className="absolute top-1/2 right-1/3 w-[1px] h-[35%] bg-red-500/30 hidden sm:block"></div>
        
        <div className="absolute top-[30%] left-0 w-full h-[1px] bg-cyan-500/20"></div>
        <div className="absolute top-[60%] left-0 w-full h-[1px] bg-red-500/20"></div>

        <motion.div
          className="absolute top-1/4 left-1/4 w-24 sm:w-32 h-24 sm:h-32 rounded-full bg-cyan-500/5 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ duration: 8, repeat: Infinity }}
        ></motion.div>
        
        <motion.div 
          className="absolute bottom-1/4 right-1/4 w-32 sm:w-40 h-32 sm:h-40 rounded-full bg-red-500/5 blur-3xl"
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.5, 0.2]
          }}
          transition={{ duration: 10, repeat: Infinity, delay: 2 }}
        ></motion.div>
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-8">
        {/* Title */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-center mb-8 sm:mb-12"
        >
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-3 sm:mb-4 glitch-text">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400 cyberpunk-text animate-gradient">
              AlgoForge
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 glitch-text">Hackathon ends in:</p>
        </motion.div>

        {/* Countdown Timer */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-3 gap-2 sm:gap-4 md:gap-8 max-w-xs sm:max-w-md md:max-w-4xl mx-auto"
        >
          {[
            { label: 'Hours', value: timeLeft.hours },
            { label: 'Minutes', value: timeLeft.minutes },
            { label: 'Seconds', value: timeLeft.seconds }
          ].map((unit, index) => (
            <motion.div
              key={unit.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              className={`bg-black/50 backdrop-blur-sm border border-cyan-500/30 rounded-lg p-3 sm:p-4 text-center hover:border-cyan-400/70 transition-all duration-300 hover:shadow-[0_0_15px_rgba(6,182,212,0.3)]`}
            >
              <div className={`text-2xl sm:text-3xl md:text-5xl font-bold text-cyan-400 mb-1 sm:mb-2 glitch-text ${timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0 ? 'text-red-500' : ''}`}>
                {unit.value.toString().padStart(2, '0')}
              </div>
              <div className="text-xs sm:text-sm text-gray-400">{unit.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Event Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-8 sm:mt-12 text-center"
        >
          <div className="flex items-center justify-center gap-2 mb-3 sm:mb-4">
            <Terminal className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-400" />
            <h2 className="text-xl sm:text-2xl font-bold glitch-text">March 22-23, 2025</h2>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-red-400" />
            <p className="text-lg sm:text-xl text-gray-300 glitch-text">KJSIT, Sion</p>
          </div>
        </motion.div>
      </div>

      {/* Completion Popup */}
      <AnimatePresence>
        {showCompletion && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-black/90 border border-cyan-500/30 rounded-lg p-4 sm:p-6 md:p-8 max-w-xs sm:max-w-md md:max-w-2xl w-full relative overflow-hidden"
            >
              {/* Animated border */}
              <div className="absolute inset-0 border-2 border-transparent gradient-border rounded-lg"></div>
              
              {/* Close button */}
              <button
                onClick={handleClosePopup}
                className="absolute top-2 right-2 sm:top-4 sm:right-4 text-gray-400 hover:text-cyan-400 transition-colors"
              >
                <X size={20} className="sm:hidden" />
                <X size={24} className="hidden sm:block" />
              </button>

              {/* Content */}
              <div className="relative z-10 text-center">
                {/* Top section with animated line */}
                <div className="relative mb-6 sm:mb-8">
                  <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent"></div>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="w-12 h-12 sm:w-16 sm:h-16 mx-auto rounded-full bg-cyan-500/10 flex items-center justify-center border border-cyan-500/30"
                  >
                    <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-cyan-400" />
                  </motion.div>
                </div>

                <motion.h2
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400"
                >
                  Hackathon Has Ended
                </motion.h2>

                <motion.p
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-gray-300 mb-6 sm:mb-8 text-base sm:text-lg leading-relaxed"
                >
                  Mission Accomplished! Thank you for being part of AlgoForge 2025. We hope you had an incredible journey of learning, innovation, and collaboration. Your passion for coding and problem-solving has made this hackathon truly special.
                </motion.p>

                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="space-y-4 sm:space-y-6"
                >
                  <p className="text-cyan-400 text-lg sm:text-xl font-semibold">
                    What's Next?
                  </p>
                  <ul className="text-gray-300 space-y-2 sm:space-y-3">
                    <li className="flex items-center justify-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                      Project Showcase
                    </li>
                    <li className="flex items-center justify-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                      Winners Announcement
                    </li>
                    <li className="flex items-center justify-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                      Prize Distribution
                    </li>
                  </ul>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default App; 