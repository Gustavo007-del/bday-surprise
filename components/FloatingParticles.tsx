"use client";

import { useEffect, useRef } from "react";

const EMOJIS = [
  "🎂","🎉","🎈","⭐","✨","🌸","💖",
  "🎊","🌟","💫","🎁","🥂","🌺","💝","🎀"
];

interface Particle {
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
  emoji: string;
  drift: number;
  rot: number;
  rotSpeed: number;
}

export default function FloatingParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const particles: Particle[] = Array.from({ length: 25 }, () => ({
      x:        Math.random() * canvas.width,
      y:        Math.random() * canvas.height + canvas.height,
      size:     Math.random() * 22 + 10,
      speed:    Math.random() * 0.45 + 0.15,
      opacity:  Math.random() * 0.35 + 0.08,
      emoji:    EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
      drift:    (Math.random() - 0.5) * 0.45,
      rot:      Math.random() * 360,
      rotSpeed: (Math.random() - 0.5) * 1.6
    }));

    let rafId: number;

    const draw = () => {
      rafId = requestAnimationFrame(draw);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.y   -= p.speed;
        p.x   += p.drift;
        p.rot += p.rotSpeed;
        if (p.y < -70) {
          p.y = canvas.height + 70;
          p.x = Math.random() * canvas.width;
        }
        ctx.save();
        ctx.globalAlpha  = p.opacity;
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rot * Math.PI) / 180);
        ctx.font         = `${p.size}px serif`;
        ctx.textAlign    = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(p.emoji, 0, 0);
        ctx.restore();
      });
    };
    draw();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ opacity: 0.6 }}
    />
  );
}
