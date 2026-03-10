"use client";

import { motion } from "framer-motion";

const WISHES = [
  {
    e: "🌟",
    t: "May Your Dreams Soar",
    d: "Like stars that never fade, may every dream you hold dear take flight and illuminate your path forward."
  },
  {
    e: "💫",
    t: "Joy Beyond Measure",
    d: "May happiness fill every corner of your 23rd year, turning each ordinary day into something extraordinary."
  },
  {
    e: "🌸",
    t: "Love & Warmth Always",
    d: "Surrounded by those who cherish you, may you always feel the depth of true, unwavering love around you."
  },
  {
    e: "✨",
    t: "A Beautiful New Chapter",
    d: "Every birthday is a fresh page. May this one open a chapter brimming with adventure, growth, and pure magic."
  }
];

export default function WishesSection() {
  return (
    <section className="relative z-10 py-28 px-4">
      <div className="max-w-5xl mx-auto">

        {/* Central heading */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-center mb-20"
        >
          <h2
            className="font-bold mb-6 shimmer-text"
            style={{
              fontFamily: "var(--font-dancing)",
              fontSize:   "clamp(38px, 7vw, 82px)"
            }}
          >
            Here's to You, Theslin
          </h2>
          <p
            className="text-white/48 max-w-2xl mx-auto leading-relaxed text-base md:text-lg"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            On this magical night of&nbsp;
            <span className="text-yellow-300">March 11th</span>, as you step
            into your radiant&nbsp;
            <span className="text-pink-300">23rd year</span>, the universe
            pauses to celebrate the incredible person you are.
          </p>
        </motion.div>

        {/* Wish cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {WISHES.map((w, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 32, x: i % 2 === 0 ? -22 : 22 }}
              whileInView={{ opacity: 1, y: 0, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, delay: i * 0.14 }}
              whileHover={{ scale: 1.03, y: -6 }}
              className="relative p-7 rounded-2xl group"
              style={{
                background:
                  "linear-gradient(135deg,rgba(255,255,255,0.03),rgba(255,255,255,0.07))",
                border:         "1px solid rgba(255,255,255,0.07)",
                backdropFilter: "blur(12px)"
              }}
            >
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(135deg,rgba(212,175,55,0.06),rgba(192,132,252,0.06))",
                  boxShadow: "inset 0 0 0 1px rgba(212,175,55,0.2)"
                }}
              />
              <div className="absolute top-4 right-5 text-4xl opacity-10 select-none">{w.e}</div>
              <div className="text-5xl mb-4">{w.e}</div>
              <h3
                className="text-xl font-semibold text-yellow-300 mb-2"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                {w.t}
              </h3>
              <p className="text-white/43 text-sm leading-relaxed">{w.d}</p>
            </motion.div>
          ))}
        </div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="mt-20 h-px"
          style={{
            background:
              "linear-gradient(90deg,transparent,rgba(212,175,55,0.35) 50%,transparent)"
          }}
        />

        {/* Final sign-off */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.6, delay: 0.4 }}
          className="text-center mt-20 pb-10"
        >
          <div className="text-7xl mb-7 float-anim select-none">🎉</div>
          <p
            className="font-bold shimmer-text"
            style={{
              fontFamily: "var(--font-dancing)",
              fontSize:   "clamp(30px, 5vw, 58px)"
            }}
          >
            Happy 23rd Birthday, Theslin! 🎂
          </p>
          <div className="flex items-center justify-center gap-4 mt-5">
            <span className="block h-px w-16 bg-gradient-to-r from-transparent to-yellow-400/38" />
            <p className="text-white/22 text-[10px] tracking-[0.45em] uppercase">
              With love &amp; celebration
            </p>
            <span className="block h-px w-16 bg-gradient-to-l from-transparent to-yellow-400/38" />
          </div>
        </motion.div>

      </div>
    </section>
  );
}
