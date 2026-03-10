"use client";

import { useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Img {
  id:    number;
  src:   string;
  title: string;
  sub:   string;
}

const IMAGES: Img[] = [
  { id: 1, src: "https://picsum.photos/seed/theslin1/700/460", title: "Pure Elegance",    sub: "A soul that radiates light"    },
  { id: 2, src: "https://picsum.photos/seed/theslin2/700/460", title: "Golden Days",      sub: "Every moment, a treasure"      },
  { id: 3, src: "https://picsum.photos/seed/theslin3/700/460", title: "Radiant Grace",    sub: "Beautiful inside & out"        },
  { id: 4, src: "https://picsum.photos/seed/theslin4/700/460", title: "Star of the Room", sub: "You light up every space"      },
  { id: 5, src: "https://picsum.photos/seed/theslin5/700/460", title: "23 & Fabulous",    sub: "Your best chapter starts now"  },
  { id: 6, src: "https://picsum.photos/seed/theslin6/700/460", title: "Forever Young",    sub: "Dreams never stop blooming"    }
];

export default function TheaterGallery() {
  const stageRef = useRef<HTMLDivElement>(null);

  const [cursor,  setCursor]  = useState({ x: -999, y: -999 });
  const [onStage, setOnStage] = useState(false);
  const [active,  setActive]  = useState<Img | null>(null);
  const [radius,  setRadius]  = useState(165);

  const onMove = useCallback((e: React.MouseEvent) => {
    if (!stageRef.current) return;
    const r = stageRef.current.getBoundingClientRect();
    setCursor({ x: e.clientX - r.left, y: e.clientY - r.top });
  }, []);

  return (
    <section className="relative z-10 py-24 px-4 md:px-8">

      {/* Section heading */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9 }}
        className="text-center mb-14"
      >
        <h2
          className="font-bold mb-3"
          style={{
            fontFamily: "var(--font-dancing)",
            fontSize:   "clamp(36px, 6vw, 72px)",
            background: "linear-gradient(90deg,#d4af37,#ff9cce,#c084fc)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent"
          }}
        >
          Gallery of Memories
        </h2>
        <p className="text-white/32 text-xs tracking-[0.45em] uppercase">
          Move your cursor across the stage to reveal ✦
        </p>
      </motion.div>

      {/* Theater wrapper */}
      <div className="relative max-w-6xl mx-auto">

        {/* Curtain rail */}
        <div
          className="absolute -top-3 left-0 right-0 h-5 z-30 rounded-t-2xl"
          style={{
            background:
              "linear-gradient(90deg,#7f1d1d 0%,#991b1b 20%,#450a0a 50%,#991b1b 80%,#7f1d1d 100%)",
            boxShadow: "0 4px 20px rgba(0,0,0,0.6)"
          }}
        />

        {/* Stage */}
        <div
          ref={stageRef}
          className="relative rounded-b-2xl overflow-hidden"
          style={{
            cursor: "none",
            border: "1px solid rgba(212,175,55,0.18)",
            boxShadow: "0 0 90px rgba(212,175,55,0.07), 0 50px 130px rgba(0,0,0,0.75)"
          }}
          onMouseMove={onMove}
          onMouseEnter={() => setOnStage(true)}
          onMouseLeave={() => {
            setOnStage(false);
            setCursor({ x: -999, y: -999 });
            setActive(null);
          }}
        >
          {/* Image grid */}
          <div className="grid grid-cols-3 grid-rows-2">
            {IMAGES.map((img, i) => (
              <motion.div
                key={img.id}
                className="relative overflow-hidden"
                style={{ aspectRatio: "16/10" }}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.09 }}
                onMouseEnter={() => setActive(img)}
                onMouseLeave={() => setActive(null)}
              >
                <img
                  src={img.src}
                  alt={img.title}
                  className="w-full h-full object-cover transition-transform duration-700"
                  style={{ transform: active?.id === img.id ? "scale(1.08)" : "scale(1)" }}
                />
                <div
                  className="absolute inset-0 pointer-events-none transition-all duration-400"
                  style={{
                    boxShadow:
                      active?.id === img.id
                        ? "inset 0 0 0 2px rgba(212,175,55,0.6), inset 0 0 30px rgba(212,175,55,0.12)"
                        : "inset 0 0 0 1px rgba(255,255,255,0.04)"
                  }}
                />
              </motion.div>
            ))}
          </div>

          {/* SPOTLIGHT DARK OVERLAY — CSS radial-gradient mask trick */}
          <div
            className="absolute inset-0 pointer-events-none z-10"
            style={{
              transition: "background 60ms linear",
              background: onStage
                ? `radial-gradient(
                     circle ${radius}px at ${cursor.x}px ${cursor.y}px,
                     transparent        0%,
                     rgba(0,0,0,0.12)  40%,
                     rgba(0,0,0,0.88)  68%,
                     rgba(0,0,0,0.97) 100%
                   )`
                : "rgba(0,0,0,0.93)"
            }}
          />

          {/* Golden glow ring at spotlight edge */}
          {onStage && (
            <div
              className="absolute pointer-events-none z-10 rounded-full"
              style={{
                left:      cursor.x,
                top:       cursor.y,
                width:     radius * 2,
                height:    radius * 2,
                transform: "translate(-50%,-50%)",
                background:
                  "radial-gradient(circle, transparent 52%, rgba(212,175,55,0.14) 72%, transparent 100%)"
              }}
            />
          )}

          {/* Custom cursor dot */}
          {onStage && (
            <div
              className="absolute pointer-events-none z-30"
              style={{ left: cursor.x, top: cursor.y, transform: "translate(-50%,-50%)" }}
            >
              <div
                className="w-9 h-9 rounded-full border-2 flex items-center justify-center"
                style={{ borderColor: "rgba(212,175,55,0.85)" }}
              >
                <div className="w-2 h-2 rounded-full" style={{ background: "#d4af37" }} />
              </div>
            </div>
          )}

          {/* Floating label near cursor */}
          <AnimatePresence>
            {active && onStage && (
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: 8, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.88 }}
                transition={{ duration: 0.22 }}
                className="absolute pointer-events-none z-30"
                style={{ left: cursor.x, top: cursor.y + 72, transform: "translateX(-50%)" }}
              >
                <div
                  className="px-4 py-2 rounded-xl text-center whitespace-nowrap"
                  style={{
                    background:     "rgba(8,4,18,0.85)",
                    backdropFilter: "blur(12px)",
                    border:         "1px solid rgba(212,175,55,0.38)"
                  }}
                >
                  <p className="text-yellow-300 text-sm font-semibold tracking-wide">{active.title}</p>
                  <p className="text-white/42 text-xs mt-0.5">{active.sub}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Top marquee */}
          <div
            className="absolute top-0 left-0 right-0 z-20 py-2.5 px-4"
            style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.78), transparent)" }}
          >
            <p className="text-center text-yellow-400/42 text-[10px] tracking-[0.45em] uppercase">
              ✦ &nbsp;Now Presenting · Theslin's Gallery&nbsp; ✦
            </p>
          </div>

          {/* Stage floor glow */}
          <div
            className="absolute bottom-0 left-0 right-0 h-px z-20"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(212,175,55,0.55) 50%, transparent)"
            }}
          />

          {/* Side curtains */}
          <div
            className="absolute inset-y-0 left-0 w-12 z-20 pointer-events-none"
            style={{ background: "linear-gradient(to right, rgba(75,8,8,0.7), transparent)" }}
          />
          <div
            className="absolute inset-y-0 right-0 w-12 z-20 pointer-events-none"
            style={{ background: "linear-gradient(to left, rgba(75,8,8,0.7), transparent)" }}
          />
        </div>

        {/* Spotlight size slider */}
        <div className="flex items-center justify-center gap-4 mt-7">
          <span className="text-white/28 text-[11px] tracking-widest uppercase">🔦 Spotlight</span>
          <input
            type="range"
            min={70}
            max={290}
            value={radius}
            onChange={(e) => setRadius(Number(e.target.value))}
            className="w-36 accent-yellow-400 opacity-45 hover:opacity-90 transition-opacity cursor-pointer"
          />
          <span className="text-white/28 text-[11px] tracking-widest uppercase">Size</span>
        </div>
      </div>
    </section>
  );
}
