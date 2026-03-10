"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";

const LETTER = `Dearest Theslin,

On this extraordinary day, I want you to know just how special you truly are. You are the kind of person who makes the world more beautiful simply by being in it — your warmth, your laughter, your grace light up every room you walk into.

As you turn 23, may you carry with you the light of every good memory, the courage to chase every dream that sets your soul on fire, and the unshakeable knowledge that you are deeply, endlessly loved.

Here's to you — to your beautiful heart, your brilliant mind, and the incredible journey that stretches ahead. Every chapter you've lived has been breathtaking. The best ones are still unwritten.

The world is so lucky to have you in it, Theslin. Never forget that.

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
    </section>
  );
}
