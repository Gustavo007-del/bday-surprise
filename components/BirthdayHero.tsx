"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import confetti from "canvas-confetti";

export default function BirthdayHero() {
  const ref = useRef<HTMLElement>(null);

  const { scrollY } = useScroll();
  const y       = useTransform(scrollY, [0, 600], [0, 160]);
  const opacity = useTransform(scrollY, [0, 450], [1, 0]);

  const burst = () => {
    const colors = ["#d4af37","#ffd700","#ff6b9d","#c084fc","#93c5fd","#ffffff"];
    const end    = Date.now() + 3500;
    (function frame() {
      confetti({ particleCount: 6, angle: 60,  spread: 65, origin: { x: 0 }, colors });
      confetti({ particleCount: 6, angle: 120, spread: 65, origin: { x: 1 }, colors });
      if (Date.now() < end) requestAnimationFrame(frame);
    })();
  };

  useEffect(() => {
    const t = setTimeout(burst, 1200);
    return () => clearTimeout(t);
  }, []);

  return (
    <motion.section
      ref={ref}
      className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 text-center"
      style={{ y, opacity }}
    >
      {/* Date badge */}
      <motion.div
        initial={{ opacity: 0, y: -32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.2 }}
        className="mb-8"
      >
        <span
          className="inline-block px-7 py-2 rounded-full text-xs md:text-sm tracking-[0.35em] uppercase font-light"
          style={{
            border:     "1px solid rgba(212,175,55,0.38)",
            background: "rgba(212,175,55,0.08)",
            color:      "#f5d97a"
          }}
        >
          ✦ &nbsp;March 11 · 2026&nbsp; ✦
        </span>
      </motion.div>

      {/* Happy Birthday label */}
      <motion.p
        initial={{ opacity: 0, letterSpacing: "0.2em" }}
        animate={{ opacity: 1, letterSpacing: "0.55em" }}
        transition={{ duration: 1, delay: 0.45 }}
        className="text-white/40 uppercase text-xs md:text-sm mb-5 font-light"
      >
        Happy Birthday
      </motion.p>

      {/* Main name */}
      <motion.h1
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, delay: 0.65, type: "spring", bounce: 0.38 }}
        className="shimmer-text font-bold leading-none select-none"
        style={{
          fontFamily: "var(--font-dancing)",
          fontSize:   "clamp(72px, 14vw, 165px)",
          filter:     "drop-shadow(0 0 38px rgba(212,175,55,0.42))"
        }}
      >
        Theslin
      </motion.h1>

      {/* Age row */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.1 }}
        className="flex items-center gap-5 mt-6"
      >
        <span className="block h-px w-14 md:w-28 bg-gradient-to-r from-transparent to-yellow-400/45" />
        <p
          className="text-white/50 text-xl md:text-2xl font-light"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Turning&nbsp;
          <span className="text-yellow-300 font-semibold">23</span>
        </p>
        <span className="block h-px w-14 md:w-28 bg-gradient-to-l from-transparent to-yellow-400/45" />
      </motion.div>

      {/* Birthday cake */}
      <motion.div
        initial={{ opacity: 0, y: 45 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 1.4 }}
        className="mt-14 float-anim glow-gold select-none"
      >
        <span
          className="text-[80px] md:text-[105px]"
          role="img"
          aria-label="birthday cake"
        >
          🎂
        </span>
      </motion.div>

      {/* Decorative rings */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 0.12, scale: 1 }}
        transition={{ duration: 2, delay: 1.6 }}
        className="absolute pointer-events-none rounded-full border border-yellow-400"
        style={{ width: 380, height: 380 }}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 0.06, scale: 1 }}
        transition={{ duration: 2.4, delay: 1.8 }}
        className="absolute pointer-events-none rounded-full border border-yellow-400"
        style={{ width: 560, height: 560 }}
      />

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.6, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-white/22 text-[10px] tracking-[0.45em] uppercase">Scroll</span>
        <motion.span
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.7 }}
          className="block w-px h-10 bg-gradient-to-b from-white/25 to-transparent"
        />
      </motion.div>
    </motion.section>
  );
}
