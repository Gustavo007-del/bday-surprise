"use client";

import { motion } from "framer-motion";

const ROW1 = [
  { src: "https://picsum.photos/seed/fs1/320/210",  label: "Together 💛"   },
  { src: "https://picsum.photos/seed/fs2/320/210",  label: "Laughter ✨"   },
  { src: "https://picsum.photos/seed/fs3/320/210",  label: "Golden Hour"   },
  { src: "https://picsum.photos/seed/fs4/320/210",  label: "Pure Joy"      },
  { src: "https://picsum.photos/seed/fs5/320/210",  label: "Our World 🌸"  },
  { src: "https://picsum.photos/seed/fs6/320/210",  label: "Sunshine"      },
  { src: "https://picsum.photos/seed/fs7/320/210",  label: "Memories 🌟"   },
  { src: "https://picsum.photos/seed/fs8/320/210",  label: "Forever"       },
];

const ROW2 = [
  { src: "https://picsum.photos/seed/fs9/320/210",  label: "Best Days 💫"  },
  { src: "https://picsum.photos/seed/fs10/320/210", label: "Radiant"       },
  { src: "https://picsum.photos/seed/fs11/320/210", label: "In Bloom 🌺"   },
  { src: "https://picsum.photos/seed/fs12/320/210", label: "Stars"         },
  { src: "https://picsum.photos/seed/fs13/320/210", label: "Pure Magic"    },
  { src: "https://picsum.photos/seed/fs14/320/210", label: "Grace"         },
  { src: "https://picsum.photos/seed/fs15/320/210", label: "Dreaming 💝"   },
  { src: "https://picsum.photos/seed/fs16/320/210", label: "Always"        },
];

/* ── Film sprocket holes ── */
function Sprockets() {
  return (
    <div className="flex items-center px-3 py-1" style={{ gap: 18 }}>
      {Array.from({ length: 28 }).map((_, i) => (
        <div
          key={i}
          className="flex-shrink-0 rounded-sm"
          style={{
            width: 13,
            height: 9,
            background: "rgba(0,0,0,0.7)",
            border: "1px solid rgba(212,175,55,0.1)",
          }}
        />
      ))}
    </div>
  );
}

/* ── One scrolling row ── */
function FilmRow({
  images,
  direction,
}: {
  images: typeof ROW1;
  direction: "left" | "right";
}) {
  const doubled = [...images, ...images, ...images];
  const xFrom   = direction === "left" ? "0%"   : "-66.66%";
  const xTo     = direction === "left" ? "-66.66%" : "0%";

  return (
    <div
      className="relative"
      style={{ background: "rgba(4,2,10,0.9)" }}
    >
      <Sprockets />

      <div className="overflow-hidden py-2 px-2">
        <motion.div
          animate={{ x: [xFrom, xTo] }}
          transition={{ duration: 40, ease: "linear", repeat: Infinity }}
          style={{ display: "flex", gap: 10, width: "max-content" }}
        >
          {doubled.map((img, i) => (
            <div
              key={i}
              className="relative flex-shrink-0 group overflow-hidden rounded"
              style={{
                width: 210,
                height: 138,
                border: "2px solid rgba(212,175,55,0.15)",
              }}
            >
              <img
                src={img.src}
                alt={img.label}
                className="w-full h-full object-cover transition-all duration-500
                           group-hover:scale-110 group-hover:brightness-110"
                style={{ filter: "sepia(0.1) brightness(0.88)" }}
              />
              {/* Hover label */}
              <div
                className="absolute inset-x-0 bottom-0 py-1.5 text-center
                           translate-y-full group-hover:translate-y-0
                           transition-transform duration-300"
                style={{
                  background: "rgba(0,0,0,0.72)",
                  backdropFilter: "blur(6px)",
                }}
              >
                <span className="text-yellow-300 text-xs tracking-wider">
                  {img.label}
                </span>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      <Sprockets />
    </div>
  );
}

/* ── Section ── */
export default function FilmStrip() {
  return (
    <section data-section="film-strip" className="relative z-10 py-20">
      <div className="section-divider mb-20" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12 px-4"
      >
        <h2
          className="font-bold mb-2"
          style={{
            fontFamily: "var(--font-dancing)",
            fontSize: "clamp(32px, 5vw, 62px)",
            background: "linear-gradient(90deg, #d4af37, #ff9cce)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Reel of Memories
        </h2>
        <p className="text-white/28 text-xs tracking-[0.42em] uppercase">
          Every frame, a story ✦
        </p>
      </motion.div>

      <div
        className="space-y-3"
        style={{
          boxShadow:
            "0 -30px 60px rgba(7,7,15,0.8), 0 30px 60px rgba(7,7,15,0.8)",
        }}
      >
        <FilmRow images={ROW1} direction="left"  />
        <FilmRow images={ROW2} direction="right" />
      </div>
    </section>
  );
}
