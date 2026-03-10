"use client";

import { motion } from "framer-motion";

const ROW1 = [
  { src: "https://res.cloudinary.com/dwfm7p4kf/image/upload/v1773160862/WhatsApp_Image_2026-03-10_at_9.33.53_PM_4_qmqmw6.jpg",  label: "Together 💛"   },
  { src: "https://res.cloudinary.com/dwfm7p4kf/image/upload/v1773162156/WhatsApp_Image_2026-03-10_at_10.32.00_PM_iaw6xf.jpg",  label: "Laughter ✨"   },
  { src: "https://res.cloudinary.com/dwfm7p4kf/image/upload/v1773160924/WhatsApp_Image_2026-03-10_at_9.58.54_PM_pj8eek.jpg",  label: "Golden Hour"   },
  { src: "https://res.cloudinary.com/dwfm7p4kf/image/upload/v1773160921/WhatsApp_Image_2026-03-10_at_9.58.53_PM_mq7clx.jpg",  label: "Pure Joy"      },
  { src: "https://res.cloudinary.com/dwfm7p4kf/image/upload/v1773160918/WhatsApp_Image_2026-03-10_at_9.58.47_PM_rswftd.jpg",  label: "Our World 🌸"  },
  { src: "https://res.cloudinary.com/dwfm7p4kf/image/upload/v1773160932/WhatsApp_Image_2026-03-10_at_9.58.55_PM_zxjsor.jpg",  label: "Sunshine"      },
  { src: "https://res.cloudinary.com/dwfm7p4kf/image/upload/v1773160897/WhatsApp_Image_2026-03-10_at_9.58.55_PM_1_lxz53l.jpg",  label: "Memories 🌟"   },
  { src: "https://res.cloudinary.com/dwfm7p4kf/image/upload/v1773160978/WhatsApp_Image_2026-03-10_at_9.58.46_PM_k90iv4.jpg",  label: "Forever"       },
];

const ROW2 = [
  { src: "https://res.cloudinary.com/dwfm7p4kf/image/upload/v1773160934/WhatsApp_Image_2026-03-10_at_9.58.54_PM_2_ghmqvp.jpg",  label: "Best Days 💫"  },
  { src: "https://res.cloudinary.com/dwfm7p4kf/image/upload/v1773160937/WhatsApp_Image_2026-03-10_at_9.58.45_PM_fydzpd.jpg", label: "Radiant"       },
  { src: "https://res.cloudinary.com/dwfm7p4kf/image/upload/v1773160533/WhatsApp_Image_2026-03-10_at_10.22.40_AM_iyjlsf.jpg", label: "In Bloom 🌺"   },
  { src: "https://res.cloudinary.com/dwfm7p4kf/image/upload/v1773160534/WhatsApp_Image_2026-03-10_at_12.40.19_PM_iewsxy.jpg", label: "Stars"         },
  { src: "https://res.cloudinary.com/dwfm7p4kf/image/upload/v1773160934/WhatsApp_Image_2026-03-10_at_9.58.54_PM_2_ghmqvp.jpg", label: "Pure Magic"    },
  { src: "https://res.cloudinary.com/dwfm7p4kf/image/upload/v1773163048/WhatsApp_Image_2026-03-10_at_9.33.53_PM_5_watoue.jpg", label: "Grace"         },
  { src: "https://res.cloudinary.com/dwfm7p4kf/image/upload/v1773160991/WhatsApp_Image_2026-03-10_at_9.58.43_PM_qq0eyh.jpg", label: "Dreaming 💝"   },
  { src: "https://res.cloudinary.com/dwfm7p4kf/image/upload/v1773160986/WhatsApp_Image_2026-03-10_at_9.58.44_PM_1_yd4pmd.jpg", label: "Always"        },
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
        <p className="text-white text-xs tracking-[0.42em] uppercase">
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
