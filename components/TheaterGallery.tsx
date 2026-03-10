
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
  { id: 1, src: "https://res.cloudinary.com/dwfm7p4kf/image/upload/v1773160882/WhatsApp_Image_2026-03-10_at_9.33.53_PM_6_hotx1y.jpg", title: "Pure Elegance",    sub: "A soul that radiates light"    },
  { id: 2, src: "https://res.cloudinary.com/dwfm7p4kf/image/upload/v1773160878/WhatsApp_Image_2026-03-10_at_9.33.53_PM_7_hwnwhe.jpg", title: "Golden Days",      sub: "Every moment, a treasure"      },
  { id: 3, src: "https://res.cloudinary.com/dwfm7p4kf/image/upload/v1773160860/WhatsApp_Image_2026-03-10_at_9.33.53_PM_5_azrhhf.jpg", title: "Radiant Grace",    sub: "Beautiful inside & out"        },
  { id: 4, src: "https://res.cloudinary.com/dwfm7p4kf/image/upload/v1773160918/WhatsApp_Image_2026-03-10_at_9.58.47_PM_rswftd.jpg", title: "Star of the Room", sub: "You light up every space"      },
  { id: 5, src: "https://res.cloudinary.com/dwfm7p4kf/image/upload/v1773160941/WhatsApp_Image_2026-03-10_at_9.58.44_PM_iu90op.jpg", title: "23 & Fabulous",    sub: "Your best chapter starts now"  },
  { id: 6, src: "https://res.cloudinary.com/dwfm7p4kf/image/upload/v1773160937/WhatsApp_Image_2026-03-10_at_9.58.45_PM_fydzpd.jpg", title: "Forever Young",    sub: "Dreams never stop blooming"    }
];

const SLATS = 10;
type Mode = "blinds" | "spotlight";

/* ─────────────────────────────────────────────
   Venetian-blind cell
   Each slat slides from scaleY(1) → scaleY(0)
   top-to-bottom on reveal, bottom-to-top on hide
───────────────────────────────────────────── */
function BlindCell({ img, isActive }: { img: Img; isActive: boolean }) {
  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Photo behind the slats */}
      <img
        src={img.src}
        alt={img.title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700"
        style={{ transform: isActive ? "scale(1.07)" : "scale(1.0)" }}
      />

      {/* Gold inset glow when active */}
      <div
        className="absolute inset-0 pointer-events-none transition-all duration-300"
        style={{
          zIndex: 3,
          boxShadow: isActive
            ? "inset 0 0 0 2px rgba(212,175,55,0.7), inset 0 0 45px rgba(212,175,55,0.1)"
            : "inset 0 0 0 1px rgba(255,255,255,0.04)"
        }}
      />

      {/* Venetian slats */}
      {Array.from({ length: SLATS }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute left-0 right-0"
          style={{
            top:             `${(i / SLATS) * 100}%`,
            height:          `${100 / SLATS + 0.4}%`,   // tiny overlap to avoid hairline gaps
            transformOrigin: "top center",
            zIndex:          2,
          }}
          animate={
            isActive
              ? { scaleY: 0, opacity: 0 }
              : { scaleY: 1, opacity: 1 }
          }
          transition={{
            duration: isActive ? 0.26 : 0.2,
            delay:    isActive
              ? i * 0.04                           // open  top → bottom
              : (SLATS - 1 - i) * 0.03,           // close bottom → top
            ease: isActive
              ? [0.22, 1, 0.36, 1]                // smooth open
              : [0.64, 0, 0.78, 0]                // snap  close
          }}
        >
          {/* Slat body — dark theatre blind */}
          <div
            className="w-full h-full relative"
            style={{
              background:
                "linear-gradient(to bottom, #120e20 0%, #1c1430 55%, #0b0916 100%)"
            }}
          >
            {/* Gold shimmer edge at the bottom of every slat */}
            <div
              className="absolute bottom-0 left-0 right-0 h-px"
              style={{
                background:
                  "linear-gradient(90deg, transparent 5%, rgba(212,175,55,0.28) 50%, transparent 95%)"
              }}
            />
          </div>
        </motion.div>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────
   Main component
───────────────────────────────────────────── */
export default function TheaterGallery() {
  const stageRef = useRef<HTMLDivElement>(null);

  const [cursor,  setCursor]  = useState({ x: -999, y: -999 });
  const [onStage, setOnStage] = useState(false);
  const [active,  setActive]  = useState<Img | null>(null);
  const [radius,  setRadius]  = useState(165);
  const [mode,    setMode]    = useState<Mode>("blinds");

  const onMove = useCallback((e: React.MouseEvent) => {
    if (!stageRef.current) return;
    const r = stageRef.current.getBoundingClientRect();
    setCursor({ x: e.clientX - r.left, y: e.clientY - r.top });
  }, []);

  return (
    <section className="relative z-10 py-24 px-4 md:px-8">

      {/* ── Heading ── */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9 }}
        className="text-center mb-10"
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
        <motion.p
          key={mode}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-white/32 text-xs tracking-[0.45em] uppercase"
        >
          {mode === "blinds"
            ? "Hover each frame to lift the cinema blinds ✦"
            : "Move your cursor across the stage to reveal ✦"}
        </motion.p>
      </motion.div>

      {/* ── Mode toggle pills ── */}
      <div className="flex items-center justify-center gap-3 mb-12">
        {(["blinds", "spotlight"] as Mode[]).map((m) => (
          <motion.button
            key={m}
            onClick={() => { setMode(m); setActive(null); }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="px-5 py-1.5 rounded-full text-xs tracking-widest uppercase transition-colors duration-300"
            style={{
              background: mode === m
                ? "rgba(212,175,55,0.16)"
                : "rgba(255,255,255,0.04)",
              border: mode === m
                ? "1px solid rgba(212,175,55,0.55)"
                : "1px solid rgba(255,255,255,0.08)",
              color: mode === m ? "#f5d97a" : "rgba(255,255,255,0.28)"
            }}
          >
            {m === "blinds" ? "🎞 Cinema Blinds" : "🔦 Spotlight"}
          </motion.button>
        ))}
      </div>

      {/* ── Theater wrapper ── */}
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
            boxShadow:
              "0 0 90px rgba(212,175,55,0.07), 0 50px 130px rgba(0,0,0,0.75)"
          }}
          onMouseMove={onMove}
          onMouseEnter={() => setOnStage(true)}
          onMouseLeave={() => {
            setOnStage(false);
            setCursor({ x: -999, y: -999 });
            setActive(null);
          }}
        >
          {/* ── Image grid ── */}
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
                {mode === "blinds" ? (
                  <BlindCell img={img} isActive={active?.id === img.id} />
                ) : (
                  <>
                    <img
                      src={img.src}
                      alt={img.title}
                      className="w-full h-full object-cover transition-transform duration-700"
                      style={{
                        transform:
                          active?.id === img.id ? "scale(1.08)" : "scale(1)"
                      }}
                    />
                    <div
                      className="absolute inset-0 pointer-events-none transition-all duration-300"
                      style={{
                        boxShadow:
                          active?.id === img.id
                            ? "inset 0 0 0 2px rgba(212,175,55,0.6), inset 0 0 30px rgba(212,175,55,0.12)"
                            : "inset 0 0 0 1px rgba(255,255,255,0.04)"
                      }}
                    />
                  </>
                )}
              </motion.div>
            ))}
          </div>

          {/* ── SPOTLIGHT overlay (spotlight mode) ── */}
          {mode === "spotlight" && (
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
          )}

          {/* ── Soft vignette (blinds mode only — no hard blackout) ── */}
          {mode === "blinds" && !onStage && (
            <div
              className="absolute inset-0 pointer-events-none z-10"
              style={{
                background:
                  "radial-gradient(ellipse at 50% 50%, transparent 20%, rgba(0,0,0,0.55) 100%)"
              }}
            />
          )}

          {/* ── Gold glow ring (spotlight mode) ── */}
          {mode === "spotlight" && onStage && (
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

          {/* ── Custom cursor ── */}
          {onStage && (
            <div
              className="absolute pointer-events-none z-30"
              style={{
                left:      cursor.x,
                top:       cursor.y,
                transform: "translate(-50%,-50%)"
              }}
            >
              <motion.div
                animate={{ scale: active ? 1.25 : 1 }}
                transition={{ duration: 0.2 }}
                className="w-9 h-9 rounded-full border-2 flex items-center justify-center"
                style={{ borderColor: "rgba(212,175,55,0.85)" }}
              >
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ background: "#d4af37" }}
                />
              </motion.div>
            </div>
          )}

          {/* ── Floating label near cursor ── */}
          <AnimatePresence>
            {active && onStage && (
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: 10, scale: 0.88 }}
                animate={{ opacity: 1, y: 0,  scale: 1    }}
                exit={{    opacity: 0,         scale: 0.88 }}
                transition={{ duration: 0.22 }}
                className="absolute pointer-events-none z-30"
                style={{
                  left:      cursor.x,
                  top:       cursor.y + 74,
                  transform: "translateX(-50%)"
                }}
              >
                <div
                  className="px-4 py-2 rounded-xl text-center whitespace-nowrap"
                  style={{
                    background:     "rgba(8,4,18,0.88)",
                    backdropFilter: "blur(14px)",
                    border:         "1px solid rgba(212,175,55,0.4)"
                  }}
                >
                  <p className="text-yellow-300 text-sm font-semibold tracking-wide">
                    {active.title}
                  </p>
                  <p className="text-yellow-200/60 text-xs mt-0.5">{active.sub}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── Top marquee ── */}
          <div
            className="absolute top-0 left-0 right-0 z-20 py-2.5 px-4"
            style={{
              background:
                "linear-gradient(to bottom, rgba(0,0,0,0.8), transparent)"
            }}
          >
            <p className="text-center text-yellow-400/40 text-[10px] tracking-[0.45em] uppercase">
              ✦ &nbsp;Now Presenting · Theslin's Gallery&nbsp; ✦
            </p>
          </div>

          {/* ── Stage floor glow ── */}
          <div
            className="absolute bottom-0 left-0 right-0 h-px z-20"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(212,175,55,0.55) 50%, transparent)"
            }}
          />

          {/* ── Side curtains ── */}
          <div
            className="absolute inset-y-0 left-0 w-12 z-20 pointer-events-none"
            style={{
              background:
                "linear-gradient(to right, rgba(75,8,8,0.72), transparent)"
            }}
          />
          <div
            className="absolute inset-y-0 right-0 w-12 z-20 pointer-events-none"
            style={{
              background:
                "linear-gradient(to left, rgba(75,8,8,0.72), transparent)"
            }}
          />
        </div>

        {/* ── Spotlight radius slider (spotlight mode only) ── */}
        <AnimatePresence>
          {mode === "spotlight" && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{    opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
              className="flex items-center justify-center gap-4 mt-7"
            >
              <span className="text-white/28 text-[11px] tracking-widest uppercase">
                🔦 Spotlight
              </span>
              <input
                type="range"
                min={70}
                max={290}
                value={radius}
                onChange={(e) => setRadius(Number(e.target.value))}
                className="w-36 accent-yellow-400 opacity-45 hover:opacity-90 transition-opacity cursor-pointer"
              />
              <span className="text-white/28 text-[11px] tracking-widest uppercase">
                Size
              </span>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
