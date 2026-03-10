"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";

const LETTER = `Dearest Theslin,

On this extraordinary day, I want you to know just how special you truly are. You are the kind of person who makes the world more beautiful simply by being in it — your warmth, your laughter, your grace light up every room you walk into.

As you turn 23, may you carry with you the light of every good memory, the courage to chase every dream that sets your soul on fire, and the unshakeable knowledge that you are deeply, endlessly loved.

The world is so lucky to have you in it so no matter what the situation dont try to ecscape , fight every problem for me and with me ,
In in the end all will be good ,also do time management and study hard till you can buy me a bmw just kidding till we are successfull.  
Theslin. Never forget that i love you more.

Happy 23rd Birthday. ✨

With all the love in the universe,`;

export default function LoveLetter() {
  const ref        = useRef<HTMLDivElement>(null);
  const isInView   = useInView(ref, { once: true, margin: "-80px" });
  const [text,     setText]    = useState("");
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    if (!isInView) return;
    let i = 0;
    const iv = setInterval(() => {
      i += 3;
      setText(LETTER.slice(0, i));
      if (i >= LETTER.length) {
        setText(LETTER);
        setFinished(true);
        clearInterval(iv);
      }
    }, 22);
    return () => clearInterval(iv);
  }, [isInView]);

  return (
    <section className="relative z-10 py-24 px-4 pb-32">
      <div className="section-divider mb-20" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-14"
      >
        <h2
          className="font-bold mb-2"
          style={{
            fontFamily: "var(--font-dancing)",
            fontSize: "clamp(32px, 5vw, 62px)",
            background: "linear-gradient(90deg, #ff9cce, #c084fc, #d4af37)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          A Letter For You
        </h2>
        <p className="text-white/28 text-xs tracking-[0.42em] uppercase">
          Written with love ✦
        </p>
      </motion.div>

      <div ref={ref} className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="relative rounded-3xl p-8 md:p-14"
          style={{
            background:
              "linear-gradient(135deg, #0e0b1e 0%, #1a1030 50%, #0e0b1e 100%)",
            border: "1px solid rgba(212,175,55,0.18)",
            boxShadow:
              "0 30px 90px rgba(0,0,0,0.55), 0 0 80px rgba(212,175,55,0.03)",
          }}
        >
          {/* Decorative corner flourishes */}
          {["top-4 left-5", "top-4 right-5", "bottom-4 left-5", "bottom-4 right-5"].map(
            (pos, i) => (
              <span
                key={i}
                className={`absolute ${pos} text-yellow-400/15 text-lg select-none`}
              >
                ✦
              </span>
            )
          )}

          {/* Seal */}
          <div className="flex justify-center mb-8">
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center text-2xl"
              style={{
                background:
                  "radial-gradient(circle, rgba(212,175,55,0.2), rgba(212,175,55,0.05))",
                border: "1px solid rgba(212,175,55,0.3)",
                boxShadow: "0 0 20px rgba(212,175,55,0.1)",
              }}
            >
              💌
            </div>
          </div>

          {/* Letter text */}
          <div className="min-h-[300px]">
            <p
              className="text-sm md:text-base leading-[2.1] whitespace-pre-line"
              style={{
                fontFamily: "var(--font-playfair)",
                color: "rgba(245,217,122,0.72)",
              }}
            >
              {text}
              {/* Blinking cursor */}
              {!finished && (
                <motion.span
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ repeat: Infinity, duration: 0.7 }}
                  style={{
                    display: "inline-block",
                    width: 2,
                    height: "1em",
                    background: "#d4af37",
                    marginLeft: 2,
                    verticalAlign: "text-bottom",
                  }}
                />
              )}
            </p>
          </div>

          {/* Signature */}
          {finished && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9 }}
              className="mt-10 pt-8 text-right"
              style={{ borderTop: "1px solid rgba(212,175,55,0.12)" }}
            >
              <p
                className="shimmer-text font-bold"
                style={{ fontFamily: "var(--font-dancing)", fontSize: 34 }}
              >
                With love 💛
              </p>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.4, type: "spring", bounce: 0.5 }}
                className="mt-4 text-5xl"
              >
                🌟
              </motion.div>
            </motion.div>
          )}
        </motion.div>
      </div>
      
      {/* Photo Section After Letter */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1 }}
        className="max-w-md mx-auto mt-20 relative"
      >
        {/* Floating sparkles around */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-2xl"
            style={{
              top: `${20 + (i % 3) * 30}%`,
              left: `${-10 + (i % 2) * 110}%`,
              zIndex: 0,
            }}
            animate={{
              y: [0, -15, 0],
              rotate: [0, 180, 360],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.3,
              ease: "easeInOut",
            }}
          >
            {["✨", "💫", "⭐", "🌟", "✦", "💖"][i]}
          </motion.div>
        ))}

        {/* Main photo container */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ 
            duration: 0.8, 
            delay: 0.3,
            type: "spring",
            bounce: 0.4 
          }}
          className="relative"
        >
          {/* Glow effect behind */}
          <motion.div
            className="absolute inset-0 rounded-3xl"
            style={{
              background: "radial-gradient(ellipse at center, rgba(212,175,55,0.15), transparent)",
              filter: "blur(20px)",
              transform: "scale(1.1)",
            }}
            animate={{
              scale: [1.1, 1.15, 1.1],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Photo frame with 9:16 aspect ratio */}
          <div
            className="relative rounded-3xl overflow-hidden shadow-2xl"
            style={{ 
              aspectRatio: "9/16",
              border: "2px solid rgba(212,175,55,0.3)",
              boxShadow: "0 25px 50px rgba(0,0,0,0.4), 0 0 0 1px rgba(212,175,55,0.1)",
            }}
          >
            <img
              src="https://res.cloudinary.com/dwfm7p4kf/image/upload/v1773160879/WhatsApp_Image_2026-03-10_at_9.33.53_PM_2_pbuhzo.jpg"
              alt="Special moment"
              className="w-full h-full object-cover"
            />

            {/* Animated overlay effects */}
            <motion.div
              className="absolute inset-0"
              style={{
                background: "linear-gradient(45deg, transparent 30%, rgba(255,156,206,0.1) 50%, transparent 70%)",
              }}
              animate={{
                x: ["-100%", "100%"],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* Corner decorations */}
            <div className="absolute top-6 left-6">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                className="text-3xl"
                style={{ color: "rgba(212,175,55,0.6)" }}
              >
                🌸
              </motion.div>
            </div>
            <div className="absolute top-6 right-6">
              <motion.div
                animate={{ rotate: [360, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                className="text-3xl"
                style={{ color: "rgba(255,156,206,0.6)" }}
              >
                💝
              </motion.div>
            </div>
            <div className="absolute bottom-6 left-6">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="text-2xl"
                style={{ color: "rgba(212,175,55,0.5)" }}
              >
                ✦
              </motion.div>
            </div>
            <div className="absolute bottom-6 right-6">
              <motion.div
                animate={{ scale: [1.2, 1, 1.2] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="text-2xl"
                style={{ color: "rgba(255,156,206,0.5)" }}
              >
                ✨
              </motion.div>
            </div>

            {/* Floating hearts around photo */}
            <motion.div
              className="absolute top-1/4 left-0 text-4xl"
              animate={{
                x: [0, 20, 0],
                y: [0, -20, 0],
                opacity: [0.4, 0.8, 0.4],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{ color: "rgba(255,156,206,0.6)" }}
            >
              💕
            </motion.div>
            <motion.div
              className="absolute top-3/4 right-0 text-3xl"
              animate={{
                x: [0, -15, 0],
                y: [0, 15, 0],
                opacity: [0.6, 0.3, 0.6],
              }}
              transition={{
                duration: 3.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
              style={{ color: "rgba(212,175,55,0.6)" }}
            >
              💖
            </motion.div>
          </div>

          {/* Bottom message with animation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-center mt-8"
          >
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <h3
                className="font-bold mb-2"
                style={{
                  fontFamily: "var(--font-dancing)",
                  fontSize: "clamp(28px, 4vw, 42px)",
                  background: "linear-gradient(90deg, #d4af37, #ff9cce, #d4af37)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                My Beautiful Girl
              </h3>
            </motion.div>
            <p
              className="text-sm tracking-wide"
              style={{ color: "rgba(245,217,122,0.6)" }}
            >
              The most beautifull image in my gallery ✦
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
