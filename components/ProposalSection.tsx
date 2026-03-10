"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

export default function ProposalSection() {
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });
  const [showMessage, setShowMessage] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const moveNoButton = () => {
    if (!containerRef.current) return;
    
    const container = containerRef.current.getBoundingClientRect();
    const maxX = container.width - 120;
    const maxY = container.height - 60;
    
    // Generate random position far from current position
    let newX, newY;
    do {
      newX = Math.random() * maxX;
      newY = Math.random() * maxY;
    } while (
      Math.abs(newX - noPosition.x) < 100 && 
      Math.abs(newY - noPosition.y) < 50
    );
    
    setNoPosition({ x: newX, y: newY });
  };

  const handleYes = () => {
    setShowMessage(true);
  };

  return (
    <section className="relative z-10 py-24 px-4">
      <div className="section-divider mb-20" />
      
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="max-w-4xl mx-auto text-center"
      >
        {/* Floating hearts background */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-3xl opacity-20"
            style={{
              top: `${10 + (i % 4) * 20}%`,
              left: `${5 + (i % 2) * 90}%`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, 10, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 4 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.4,
              ease: "easeInOut",
            }}
          >
            {["💕", "💖", "💝", "💗", "💓", "💞", "💘", "❤️"][i]}
          </motion.div>
        ))}

        {/* Main question */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-16"
        >
          <h2
            className="font-bold mb-6"
            style={{
              fontFamily: "var(--font-dancing)",
              fontSize: "clamp(42px, 6vw, 78px)",
              background: "linear-gradient(90deg, #ff69b4, #ff1493, #c71585)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Will You Marry Me?
          </h2>
          
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="text-6xl mb-8"
          >
            💍
          </motion.div>
          
          <p
            className="text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
            style={{ color: "rgba(245,217,122,0.8)" }}
          >
            I can't imagine my life without you. You make every day brighter, 
            every moment special, and every dream worth chasing. 
            So... will you make me the happiest person alive?
          </p>
        </motion.div>

        {/* Buttons container */}
        <div 
          ref={containerRef}
          className="relative h-64 mb-12"
        >
          {/* YES Button */}
          <motion.button
            onClick={handleYes}
            whileTap={{ scale: 0.95 }}
            className="absolute left-1/4 top-1/2 transform -translate-x-1/2 -translate-y-1/2 px-8 py-4 rounded-full text-lg font-bold transition-all duration-300 shadow-lg"
            style={{
              background: "linear-gradient(135deg, #ff69b4, #ff1493)",
              border: "2px solid rgba(255,255,255,0.3)",
              boxShadow: "0 10px 30px rgba(255,105,180,0.3)",
            }}
          >
            Yes! 💕
          </motion.button>

          {/* NO Button - moves away on hover */}
          <motion.button
            onMouseEnter={moveNoButton}
            animate={{
              x: noPosition.x,
              y: noPosition.y,
            }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute right-1/4 top-1/2 transform translate-x-1/2 -translate-y-1/2 px-8 py-4 rounded-full text-lg font-bold transition-all duration-300 shadow-lg"
            style={{
              background: "linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))",
              border: "2px solid rgba(255,255,255,0.2)",
              color: "rgba(255,255,255,0.6)",
            }}
          >
            No
          </motion.button>
        </div>

        {/* Success Message */}
        {showMessage && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            {/* Celebration animation */}
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-2xl"
                style={{
                  top: "50%",
                  left: "50%",
                }}
                animate={{
                  y: [0, -200 - Math.random() * 100],
                  x: (Math.random() - 0.5) * 200,
                  opacity: [1, 0],
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 2 + Math.random(),
                  ease: "easeOut",
                }}
              >
                {["🎉", "🎊", "💕", "💖", "✨", "🌟", "💝", "🎈", "🎁", "💐", "🌹", "💍"][i]}
              </motion.div>
            ))}

            <div
              className="relative rounded-3xl p-8 md:p-12"
              style={{
                background: "linear-gradient(135deg, #ff69b4 0%, #ff1493 50%, #c71585 100%)",
                boxShadow: "0 30px 90px rgba(255,105,180,0.4)",
              }}
            >
              <h3
                className="font-bold mb-4"
                style={{
                  fontFamily: "var(--font-dancing)",
                  fontSize: "clamp(36px, 5vw, 64px)",
                  color: "white",
                }}
              >
                YESSS! 💕
              </h3>
              <p className="text-white/90 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
                You've made me the happiest person in the universe! 
                I can't wait to spend forever with you, creating beautiful memories 
                and building our dream life together. This is just the beginning 
                of our amazing love story! 💍✨
              </p>
              
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
                className="mt-8 text-6xl"
              >
                💑💕
              </motion.div>
            </div>
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}
