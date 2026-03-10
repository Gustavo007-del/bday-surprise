"use client";

import { motion } from "framer-motion";

const ENTRIES = [
  {
    side: "left",
    label: "The Beginning",
    date: "Once upon a time",
    img: "https://res.cloudinary.com/dwfm7p4kf/image/upload/v1773163043/WhatsApp_Image_2026-03-10_at_9.58.45_PM_mrnend.jpg",
    emoji: "🌱",
    desc: "on a ethinic i saw a girl a spark that lit up the whole sky.",
  },
  {
    side: "right",
    label: "First Adventure",
    date: "A day to remember",
    img: "https://res.cloudinary.com/dwfm7p4kf/image/upload/v1773163015/WhatsApp_Image_2026-03-10_at_9.58.44_PM_dhzrfw.jpg",
    emoji: "🌍",
    desc: "Life is the best adventure, especially when you're the kind of person who makes every moment extraordinary.",
  },
  {
    side: "left",
    label: "Pure Laughter",
    date: "The best days",
    img: "https://res.cloudinary.com/dwfm7p4kf/image/upload/v1773160990/WhatsApp_Image_2026-03-10_at_9.53.29_PM_cwlbo3.jpg",
    emoji: "😂",
    desc: "Your laughter is the kind that makes rooms brighter and hearts warmer. Never stop laughing.",
  },
  {
    side: "right",
    label: "Golden Moments",
    date: "Sunlit memories",
    img: "https://res.cloudinary.com/dwfm7p4kf/image/upload/v1773160897/WhatsApp_Image_2026-03-10_at_9.58.55_PM_1_lxz53l.jpg",
    emoji: "✨",
    desc: "Some moments are made of pure gold. These are the ones we hold close, long after the day has passed.",
  },
  {
    side: "left",
    label: "Long Walk",
    date: "Side by side",
    img: "https://res.cloudinary.com/dwfm7p4kf/image/upload/v1773160986/WhatsApp_Image_2026-03-10_at_9.58.44_PM_1_yd4pmd.jpg",
    emoji: "🌸",
    desc: "The most beautiful Walks we kissed smiled walked making beautifull memories",
  },
  {
    side: "right",
    label: "Today — 23 🎂",
    date: "March 11, 2026",
    img: "https://res.cloudinary.com/dwfm7p4kf/image/upload/v1773160882/WhatsApp_Image_2026-03-10_at_9.33.53_PM_6_hotx1y.jpg",
    emoji: "🌟",
    desc: "And now, here we are. A new chapter, a new year, a new page in the most beautiful story ever written. wishing a best year and a best bday",
  },
];

export default function MemoryTimeline() {
  return (
    <section className="relative z-10 py-24 px-4">
      <div className="section-divider mb-20" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-20"
      >
        <h2
          className="font-bold mb-2"
          style={{
            fontFamily: "var(--font-dancing)",
            fontSize: "clamp(32px, 5vw, 62px)",
            background: "linear-gradient(90deg, #93c5fd, #c084fc, #d4af37)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          The Story So Far
        </h2>
        <p className="text-white text-xs tracking-[0.42em] uppercase">
          A timeline of beautiful moments ✦
        </p>
      </motion.div>

      {/* Timeline */}
      <div className="relative max-w-4xl mx-auto">
        {/* Center vertical line (desktop) */}
        <div
          className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2"
          style={{
            background:
              "linear-gradient(to bottom, transparent, rgba(212,175,55,0.45) 8%, rgba(212,175,55,0.25) 92%, transparent)",
          }}
        />
        {/* Left vertical line (mobile) */}
        <div
          className="md:hidden absolute left-4 top-0 bottom-0 w-px"
          style={{
            background:
              "linear-gradient(to bottom, transparent, rgba(212,175,55,0.4) 5%, rgba(212,175,55,0.2) 95%, transparent)",
          }}
        />

        <div className="space-y-16 md:space-y-20">
          {ENTRIES.map((e, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: e.side === "left" ? -40 : 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className={`relative flex items-start md:items-center
                          pl-12 md:pl-0
                          ${e.side === "right"
                            ? "md:flex-row-reverse"
                            : "md:flex-row"
                          }`}
            >
              {/* Mobile dot */}
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: 0.3 }}
                className="md:hidden absolute left-2.5 top-6 w-4 h-4 rounded-full z-10 -translate-x-1/2"
                style={{
                  background: "radial-gradient(circle, #ffd700, #d4af37)",
                  boxShadow: "0 0 10px rgba(212,175,55,0.7)",
                }}
              />

              {/* Card */}
              <div className="w-full md:w-5/12">
                <motion.div
                  whileHover={{ scale: 1.02, y: -4 }}
                  className="rounded-2xl overflow-hidden"
                  style={{
                    background:
                      "linear-gradient(135deg,rgba(255,255,255,0.04),rgba(255,255,255,0.08))",
                    border: "1px solid rgba(212,175,55,0.14)",
                    backdropFilter: "blur(10px)",
                    boxShadow: "0 10px 40px rgba(0,0,0,0.4)",
                  }}
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={e.img}
                      alt={e.label}
                      className="w-full h-44 object-cover transition-transform duration-700 hover:scale-105"
                    />
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background:
                          "linear-gradient(to top, rgba(10,5,20,0.6), transparent 60%)",
                      }}
                    />
                    <span className="absolute bottom-3 left-3 text-2xl">
                      {e.emoji}
                    </span>
                  </div>
                  <div className="p-5">
                    <p className="text-yellow-400/50 text-[10px] tracking-[0.4em] uppercase mb-1.5">
                      {e.date}
                    </p>
                    <h3
                      className="text-white text-lg font-semibold mb-2"
                      style={{ fontFamily: "var(--font-playfair)" }}
                    >
                      {e.label}
                    </h3>
                    <p className="text-white/40 text-sm leading-relaxed">
                      {e.desc}
                    </p>
                  </div>
                </motion.div>
              </div>

              {/* Desktop center dot */}
              <div className="hidden md:flex w-2/12 justify-center relative">
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.35 }}
                  className="w-5 h-5 rounded-full z-10"
                  style={{
                    background: "radial-gradient(circle, #ffd700, #d4af37)",
                    boxShadow: "0 0 16px rgba(212,175,55,0.7)",
                  }}
                />
              </div>

              {/* Desktop spacer */}
              <div className="hidden md:block md:w-5/12" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
