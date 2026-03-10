"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

const PALETTE = [
  { base: "#ff9cce", dark: "#d4689a", glow: "rgba(255,156,206,0.5)" },
  { base: "#c084fc", dark: "#8b5ccf", glow: "rgba(192,132,252,0.5)" },
  { base: "#ffd700", dark: "#c9a227", glow: "rgba(255,215,0,0.55)" },
  { base: "#93c5fd", dark: "#5a96d8", glow: "rgba(147,197,253,0.5)" },
  { base: "#86efac", dark: "#4db87a", glow: "rgba(134,239,172,0.5)" },
  { base: "#fda4af", dark: "#d0606e", glow: "rgba(253,164,175,0.5)" },
];

const TOTAL = 23;
const ROWS = [
  [0, 1, 2, 3, 4, 5, 6, 7],
  [8, 9, 10, 11, 12, 13, 14, 15],
  [16, 17, 18, 19, 20, 21, 22],
];

const getColor = (id: number) => PALETTE[id % PALETTE.length];

function Flame() {
  return (
    <div className="relative flex flex-col items-center -mb-1">
      <div
        style={{
          width: 9,
          height: 16,
          background:
            "radial-gradient(ellipse at center bottom, #fff9c4, #ffb300 40%, #ff6f00 80%, transparent)",
          borderRadius: "50% 50% 28% 28% / 60% 60% 28% 28%",
          animation: "flicker 0.35s ease-in-out infinite alternate",
          transformOrigin: "bottom center",
          filter: "blur(0.4px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 2,
          width: 4,
          height: 8,
          background:
            "radial-gradient(ellipse, rgba(255,255,255,0.9) 20%, rgba(255,249,196,0.6) 60%, transparent)",
          borderRadius: "50% 50% 28% 28% / 60% 60% 28% 28%",
        }}
      />
    </div>
  );
}

function Smoke() {
  return (
    <div
      className="absolute pointer-events-none"
      style={{ bottom: "100%", left: "50%", transform: "translateX(-50%)" }}
    >
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0.6, y: 0, x: 0, scale: 0.4 }}
          animate={{ opacity: 0, y: -36, x: (i - 1) * 5, scale: 2 }}
          transition={{ duration: 1.1, delay: i * 0.13, ease: "easeOut" }}
          className="absolute rounded-full"
          style={{
            width: 7,
            height: 7,
            background: "rgba(200,200,220,0.45)",
            filter: "blur(2px)",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        />
      ))}
    </div>
  );
}

interface CandleProps {
  id: number;
  blown: boolean;
  showSmoke: boolean;
  onClick: () => void;
}

function Candle({ id, blown, showSmoke, onClick }: CandleProps) {
  const c = getColor(id);

  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={blown ? undefined : { scale: 1.18, y: -4 }}
      whileTap={blown ? undefined : { scale: 0.96 }}
      className="relative flex flex-col items-center focus:outline-none"
      style={{ cursor: blown ? "default" : "pointer" }}
    >
      <AnimatePresence>{showSmoke && <Smoke />}</AnimatePresence>

      <div style={{ height: 20 }}>
        {!blown ? (
          <Flame />
        ) : (
          <div
            style={{
              width: 3,
              height: 6,
              background: "#555",
              borderRadius: 2,
              margin: "0 auto",
            }}
          />
        )}
      </div>

      <div
        style={{
          width: 2,
          height: 5,
          background: blown ? "#444" : "#6b4c1e",
          borderRadius: 1,
          marginBottom: -1,
          zIndex: 1,
        }}
      />

      <motion.div
        animate={{ opacity: blown ? 0.45 : 1 }}
        transition={{ duration: 0.35 }}
        style={{
          width: 14,
          height: 50,
          borderRadius: "4px 4px 3px 3px",
          background: blown
            ? "linear-gradient(to bottom, #4a4a4a, #333)"
            : `
              linear-gradient(
                to right,
                rgba(255,255,255,0.18) 0%,
                transparent 40%,
                transparent 65%,
                rgba(255,255,255,0.1) 100%
              ),
              linear-gradient(to bottom, ${c.base} 0%, ${c.dark} 100%)
            `,
          boxShadow: blown
            ? "none"
            : `0 0 10px ${c.glow}, 0 0 4px ${c.glow}`,
          transition: "background 0.35s ease, box-shadow 0.35s ease",
        }}
      />
    </motion.button>
  );
}

export default function CandleGame() {
  const [blown, setBlown] = useState<Set<number>>(new Set());
  const [smokes, setSmokes] = useState<Set<number>>(new Set());
  const [allDone, setAllDone] = useState(false);
  const [showBanner, setShowBanner] = useState(false);

  const blowOut = useCallback(
    (id: number) => {
      if (blown.has(id) || allDone) return;

      setSmokes((prev) => new Set(prev).add(id));
      setTimeout(() => {
        setSmokes((prev) => {
          const next = new Set(prev);
          next.delete(id);
          return next;
        });
      }, 1300);

      setBlown((prev) => {
        const next = new Set(prev).add(id);
        if (next.size === TOTAL) {
          setTimeout(() => {
            setAllDone(true);
            setShowBanner(true);

            const colors = [
              "#d4af37",
              "#ffd700",
              "#ff9cce",
              "#c084fc",
              "#ffffff",
            ];
            const end = Date.now() + 4500;
            (function frame() {
              confetti({
                particleCount: 8,
                spread: 90,
                origin: { y: 0.6 },
                colors,
              });
              if (Date.now() < end) requestAnimationFrame(frame);
            })();
          }, 250);
        }
        return next;
      });
    },
    [blown, allDone]
  );

  const reset = () => {
    setBlown(new Set());
    setSmokes(new Set());
    setAllDone(false);
    setShowBanner(false);
  };

  const remaining = TOTAL - blown.size;

  return (
    <section className="relative z-10 py-24 px-4">
      <div className="section-divider mb-20" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        
      </motion.div>

      {/* Counter or main message */}
      <div className="text-center mb-10 min-h-[3rem] flex items-center justify-center">
        <AnimatePresence mode="wait">
          {!allDone ? (
            <motion.p
              key={remaining}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="text-white/45 text-sm"
            >
              <span className="text-yellow-300 font-bold text-3xl">
                {remaining}
              </span>
              <span className="ml-2 text-base">
                candle{remaining !== 1 ? "s" : ""} remaining
              </span>
            </motion.p>
          ) : (
            <motion.p
              key="done"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", bounce: 0.4 }}
              className="shimmer-text font-bold"
              style={{ fontFamily: "var(--font-dancing)", fontSize: 36 }}
            >
              Make a Wish, Theslin! Because this year its gonna come true dear 🌟
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Cake stage + candles */}
      <div className="max-w-xl mx-auto">
        <div
          className="relative rounded-3xl px-6 py-10"
          style={{
            background:
              "linear-gradient(135deg, #180a2e 0%, #2d1040 50%, #180a2e 100%)",
            border: "1px solid rgba(212,175,55,0.2)",
            boxShadow:
              "0 0 60px rgba(212,175,55,0.05), 0 30px 80px rgba(0,0,0,0.5)",
          }}
        >
          <div className="space-y-5">
            {ROWS.map((row, ri) => (
              <div
                key={ri}
                className="flex justify-center"
                style={{ gap: "clamp(10px, 3vw, 22px)" }}
              >
                {row.map((id) => (
                  <Candle
                    key={id}
                    id={id}
                    blown={blown.has(id)}
                    showSmoke={smokes.has(id)}
                    onClick={() => blowOut(id)}
                  />
                ))}
              </div>
            ))}
          </div>

          <div className="mt-8 space-y-1.5">
            <div
              className="rounded-xl h-7 mx-2"
              style={{
                background:
                  "linear-gradient(to right, #2d1b4e, #4a1942, #2d1b4e)",
                border: "1px solid rgba(212,175,55,0.18)",
              }}
            />
            <div
              className="rounded-xl h-9 -mx-1"
              style={{
                background:
                  "linear-gradient(to right, #3d1f5e, #5a2252, #3d1f5e)",
                border: "1px solid rgba(212,175,55,0.2)",
              }}
            />
            <div
              className="rounded-xl h-10 -mx-3"
              style={{
                background:
                  "linear-gradient(to right, #2a1545, #401838, #2a1545)",
                border: "1px solid rgba(212,175,55,0.15)",
              }}
            />
          </div>
        </div>

        {/* Extra celebration content after all candles are out */}
        <AnimatePresence>
          {showBanner && (
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 18 }}
              transition={{ duration: 0.7 }}
              className="mt-10 flex flex-col items-center gap-4"
            >
              {/* Glowing banner */}
              <div
                className="px-6 py-3 rounded-full text-center"
                style={{
                  background:
                    "linear-gradient(90deg, rgba(212,175,55,0.2), rgba(255,156,206,0.16))",
                  border: "1px solid rgba(212,175,55,0.55)",
                  boxShadow:
                    "0 0 30px rgba(212,175,55,0.35), 0 0 60px rgba(255,156,206,0.15)",
                }}
              >
                <p
                  className="shimmer-text font-bold"
                  style={{
                    fontFamily: "var(--font-dancing)",
                    fontSize: 26,
                  }}
                >
                  Happy 23rd Birthday, Theslin 🎉
                </p>
              </div>

              {/* Emoji row */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex items-center gap-3 text-2xl"
              >
                <motion.span
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 1.6 }}
                >
                  🎂
                </motion.span>
                <span>✨</span>
                <span>💖</span>
                <span>🌟</span>
              </motion.div>

              {/* “Play a memory” button (you can hook it to scroll) */}
              <motion.button
                type="button"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.96 }}
                className="px-6 py-2 rounded-full text-xs tracking-[0.35em] uppercase"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.16)",
                  color: "rgba(255,255,255,0.8)",
                }}
                onClick={() => {
                  // Example: scroll to the film strip section
                  const el = document.querySelector("[data-section='film-strip']");
                  if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
                }}
              >
                ▶ &nbsp;Play a Memory
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Reset button */}
        <AnimatePresence>
          {allDone && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.4 }}
              className="text-center mt-8"
            >
              <button
                type="button"
                onClick={reset}
                className="px-7 py-2 rounded-full text-xs tracking-[0.35em] uppercase
                           transition-all duration-300 hover:scale-105"
                style={{
                  background: "rgba(212,175,55,0.1)",
                  border: "1px solid rgba(212,175,55,0.38)",
                  color: "#f5d97a",
                }}
              >
                ↺ &nbsp;Light Again
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
