"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const W = 400;
const H = 230;

export default function ScratchCard() {
  const canvasRef  = useRef<HTMLCanvasElement>(null);
  const drawing    = useRef(false);
  const lastPos    = useRef<{ x: number; y: number } | null>(null);

  const [revealed, setRevealed] = useState(0);
  const [done,     setDone]     = useState(false);

  /* ── Draw foil surface ── */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const g = ctx.createLinearGradient(0, 0, W, H);
    g.addColorStop(0,    "#b8902a");
    g.addColorStop(0.25, "#e8c84a");
    g.addColorStop(0.5,  "#f7e070");
    g.addColorStop(0.75, "#e0b830");
    g.addColorStop(1,    "#c9a227");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, W, H);

    /* Noise texture */
    for (let i = 0; i < 6000; i++) {
      ctx.fillStyle = `rgba(0,0,0,${Math.random() * 0.07})`;
      ctx.fillRect(Math.random() * W, Math.random() * H, 2, 2);
    }
    /* Diagonal shine streaks */
    for (let i = 0; i < 5; i++) {
      const x = (W / 5) * i;
      const sh = ctx.createLinearGradient(x, 0, x + 60, H);
      sh.addColorStop(0,   "rgba(255,255,255,0)");
      sh.addColorStop(0.5, "rgba(255,255,255,0.06)");
      sh.addColorStop(1,   "rgba(255,255,255,0)");
      ctx.fillStyle = sh;
      ctx.fillRect(x, 0, 60, H);
    }

    /* Instruction text */
    ctx.fillStyle = "rgba(90,55,0,0.55)";
    ctx.font      = "bold 15px Georgia, serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("✦  Scratch to Reveal  ✦", W / 2, H / 2 - 14);
    ctx.font = "12px Georgia, serif";
    ctx.fillStyle = "rgba(90,55,0,0.4)";
    ctx.fillText("Your special birthday message awaits...", W / 2, H / 2 + 16);
  }, []);

  /* ── Get canvas-relative pointer position ── */
  const getPos = (
    e: React.MouseEvent | React.TouchEvent,
    canvas: HTMLCanvasElement
  ) => {
    const r  = canvas.getBoundingClientRect();
    const sx = canvas.width  / r.width;
    const sy = canvas.height / r.height;
    if ("touches" in e) {
      return {
        x: (e.touches[0].clientX - r.left) * sx,
        y: (e.touches[0].clientY - r.top)  * sy,
      };
    }
    return {
      x: (e.clientX - r.left) * sx,
      y: (e.clientY - r.top)  * sy,
    };
  };

  /* ── Scratch with smooth stroke ── */
  const scratchAt = useCallback(
    (x: number, y: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      ctx.globalCompositeOperation = "destination-out";
      ctx.lineWidth   = 52;
      ctx.lineCap     = "round";
      ctx.lineJoin    = "round";
      ctx.strokeStyle = "rgba(0,0,0,1)";

      ctx.beginPath();
      if (lastPos.current) {
        ctx.moveTo(lastPos.current.x, lastPos.current.y);
        ctx.lineTo(x, y);
      } else {
        ctx.arc(x, y, 26, 0, Math.PI * 2);
      }
      ctx.stroke();
      lastPos.current = { x, y };

      /* Sample revealed % (every ~10 calls is fine) */
      const data        = ctx.getImageData(0, 0, W, H).data;
      let transparent   = 0;
      for (let i = 3; i < data.length; i += 16) {
        if (data[i] < 40) transparent++;
      }
      const pct = Math.min(
        100,
        Math.round((transparent / (W * H / 4)) * 100)
      );
      setRevealed(pct);

      if (pct >= 62 && !done) {
        setDone(true);
        /* Fade canvas out */
        let alpha = 1;
        const fade = setInterval(() => {
          alpha -= 0.06;
          ctx.globalCompositeOperation = "destination-out";
          ctx.fillStyle = `rgba(0,0,0,${0.06})`;
          ctx.fillRect(0, 0, W, H);
          if (alpha <= 0) clearInterval(fade);
        }, 30);
      }
    },
    [done]
  );

  const onDown  = (e: React.MouseEvent | React.TouchEvent) => {
    drawing.current = true;
    lastPos.current = null;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const pos = getPos(e, canvas);
    scratchAt(pos.x, pos.y);
  };
  const onUp    = () => { drawing.current = false; lastPos.current = null; };
  const onMove  = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!drawing.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    scratchAt(getPos(e, canvas).x, getPos(e, canvas).y);
  };
  const onTouch = (e: React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    if (!drawing.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    scratchAt(getPos(e, canvas).x, getPos(e, canvas).y);
  };

  return (
    <section className="relative z-10 py-24 px-4">
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
            background: "linear-gradient(90deg, #d4af37, #c084fc)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          A Secret Message 💌
        </h2>
        <p className="text-white/28 text-xs tracking-[0.42em] uppercase">
          Scratch the card to reveal it ✦
        </p>
      </motion.div>

      <div className="flex flex-col items-center gap-6">
        {/* Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative rounded-2xl overflow-hidden"
          style={{
            width: W,
            maxWidth: "100%",
            height: H,
            boxShadow:
              "0 20px 70px rgba(0,0,0,0.55), 0 0 50px rgba(212,175,55,0.1)",
            border: "1px solid rgba(212,175,55,0.22)",
          }}
        >
          {/* Message underneath */}
          <div
            className="absolute inset-0 flex flex-col items-center justify-center px-8 text-center"
            style={{
              background:
                "linear-gradient(135deg, #0f0824 0%, #1c0a32 50%, #0f0824 100%)",
            }}
          >
            <div className="text-4xl mb-3">💝</div>
            <p
              className="shimmer-text font-bold mb-3"
              style={{ fontFamily: "var(--font-dancing)", fontSize: 26 }}
            >
              You Are Truly Special
            </p>
            <p
              className="text-sm leading-relaxed"
              style={{
                fontFamily: "var(--font-playfair)",
                color: "rgba(245,217,122,0.65)",
              }}
            >
              Theslin, the world shines brighter because you're in it and iam here because of you
              Happy 23rd — i love you so much and be with me forever no matter what 🌟
            </p>
          </div>

          {/* Scratch canvas */}
          <canvas
            ref={canvasRef}
            width={W}
            height={H}
            className="absolute inset-0 w-full h-full"
            style={{
              cursor: done ? "default" : "crosshair",
              opacity: done ? 0 : 1,
              transition: "opacity 0.9s ease",
              touchAction: "none",
            }}
            onMouseDown={onDown}
            onMouseUp={onUp}
            onMouseLeave={onUp}
            onMouseMove={onMove}
            onTouchStart={onDown}
            onTouchEnd={onUp}
            onTouchMove={onTouch}
          />
        </motion.div>

        {/* Progress bar */}
        <AnimatePresence>
          {!done && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-72 space-y-2"
            >
              <div className="flex justify-between text-[10px] text-white/28 tracking-[0.38em] uppercase">
                <span>Revealed</span>
                <span>{revealed}%</span>
              </div>
              <div
                className="h-1.5 rounded-full overflow-hidden"
                style={{ background: "rgba(255,255,255,0.07)" }}
              >
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    background: "linear-gradient(90deg, #c9a227, #ffd700)",
                  }}
                  animate={{ width: `${revealed}%` }}
                  transition={{ duration: 0.1 }}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {done && (
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-yellow-400/50 text-[10px] tracking-[0.45em] uppercase"
            >
              ✦ &nbsp;Message Revealed&nbsp; ✦
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
