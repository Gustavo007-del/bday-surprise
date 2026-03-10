"use client";

import { motion } from "framer-motion";

const POLAROIDS = [
  { src: "https://res.cloudinary.com/dwfm7p4kf/image/upload/v1773163054/WhatsApp_Image_2026-03-10_at_9.33.53_PM_3_tqqsaf.jpg", caption: "Just Us 💛",        rot: -6  },
  { src: "https://res.cloudinary.com/dwfm7p4kf/image/upload/v1773162977/WhatsApp_Image_2026-03-10_at_9.53.29_PM_q5osfv.jpg", caption: "Golden Hour ✨",    rot:  4  },
  { src: "https://res.cloudinary.com/dwfm7p4kf/image/upload/v1773163020/WhatsApp_Image_2026-03-10_at_9.54.50_PM_dvakzy.jpg", caption: "Best Memories",     rot: -2  },
  { src: "https://res.cloudinary.com/dwfm7p4kf/image/upload/v1773162976/WhatsApp_Image_2026-03-10_at_9.53.33_PM_jxzwdr.jpg", caption: "Pure Happiness 🌸", rot:  6  },
  { src: "https://res.cloudinary.com/dwfm7p4kf/image/upload/v1773163747/WhatsApp_Image_2026-03-10_at_10.40.30_PM_b6phfg.jpg", caption: "Always Smiling",    rot: -5  },
  { src: "https://res.cloudinary.com/dwfm7p4kf/image/upload/v1773163756/WhatsApp_Image_2026-03-10_at_10.40.27_PM_2_bw1kxv.jpg", caption: "Radiant & Free 💫", rot:  3  },
  { src: "https://res.cloudinary.com/dwfm7p4kf/image/upload/v1773163736/WhatsApp_Image_2026-03-10_at_10.40.28_PM_yczufc.jpg", caption: "Forever Young",     rot: -7  },
  { src: "https://res.cloudinary.com/dwfm7p4kf/image/upload/v1773163783/WhatsApp_Image_2026-03-10_at_10.53.53_PM_xcd6qn.jpg", caption: "Star of My World ⭐",rot:  5  },
  { src: "https://res.cloudinary.com/dwfm7p4kf/image/upload/v1773163776/WhatsApp_Image_2026-03-10_at_10.43.38_PM_bgpeok.jpg", caption: "Birthday Girl 🎂",  rot: -3  },
];

const PIN_COLORS = [
  "radial-gradient(circle at 35% 35%, #ff9cce, #c04070)",
  "radial-gradient(circle at 35% 35%, #ffd700, #c9a227)",
  "radial-gradient(circle at 35% 35%, #c084fc, #7c3aed)",
  "radial-gradient(circle at 35% 35%, #93c5fd, #2563eb)",
];

export default function PolaroidBoard() {
  return (
    <section className="relative z-10 py-20 px-4">
      <div className="section-divider mb-20" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2
          className="font-bold mb-2"
          style={{
            fontFamily: "var(--font-dancing)",
            fontSize: "clamp(32px, 5vw, 62px)",
            background: "linear-gradient(90deg, #c084fc, #ff9cce, #d4af37)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Our Moments
        </h2>
        <p className="text-white/28 text-xs tracking-[0.42em] uppercase">
          Hover to frame them ✦
        </p>
      </motion.div>

      {/* Board */}
      <div
        className="relative max-w-5xl mx-auto rounded-3xl p-8 md:p-14"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, #130e20 0%, #0d0a18 60%, #07070f 100%)",
          border: "1px solid rgba(255,255,255,0.05)",
          boxShadow:
            "inset 0 0 100px rgba(0,0,0,0.5), 0 40px 100px rgba(0,0,0,0.4)",
        }}
      >
        {/* Subtle grid texture */}
        <div
          className="absolute inset-0 rounded-3xl pointer-events-none opacity-5"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(212,175,55,0.4) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />

        {/* Polaroid grid */}
        <div className="relative grid grid-cols-2 md:grid-cols-3 gap-10 md:gap-14 justify-items-center">
          {POLAROIDS.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40, rotate: p.rot }}
              whileInView={{ opacity: 1, y: 0, rotate: p.rot }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.07 }}
              whileHover={{
                rotate: 0,
                scale: 1.1,
                zIndex: 20,
                transition: { duration: 0.3 },
              }}
              className="relative cursor-pointer"
              style={{ transformOrigin: "center top" }}
            >
              {/* Thumbtack */}
              <div
                className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-5 h-5 rounded-full z-10"
                style={{
                  background: PIN_COLORS[i % PIN_COLORS.length],
                  boxShadow: "0 2px 8px rgba(0,0,0,0.6), inset 0 1px 2px rgba(255,255,255,0.3)",
                }}
              />

              {/* Polaroid body */}
              <div
                style={{
                  background: "#f2ead8",
                  padding: "8px 8px 36px",
                  borderRadius: 2,
                  boxShadow:
                    "0 10px 40px rgba(0,0,0,0.6), 0 2px 8px rgba(0,0,0,0.3), inset 0 0 0 1px rgba(255,255,255,0.5)",
                }}
              >
                {/* Photo area */}
                <div
                  className="overflow-hidden"
                  style={{ width: 148, height: 118 }}
                >
                  <img
                    src={p.src}
                    alt={p.caption}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    style={{ filter: "saturate(1.1) contrast(1.05)" }}
                  />
                </div>
                {/* Caption */}
                <p
                  className="text-center mt-1.5"
                  style={{
                    fontFamily: "var(--font-dancing)",
                    fontSize: 14,
                    color: "#3a2a12",
                    lineHeight: 1.3,
                  }}
                >
                  {p.caption}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
