"use client";

import dynamic from "next/dynamic";
import BirthdayHero      from "@/components/BirthdayHero";
import TheaterGallery    from "@/components/TheaterGallery";
import WishesSection     from "@/components/WishesSection";
import FloatingParticles from "@/components/FloatingParticles";
import FilmStrip         from "@/components/FilmStrip";
import PolaroidBoard     from "@/components/PolaroidBoard";
import MemoryTimeline    from "@/components/MemoryTimeline";
import CandleGame        from "@/components/CandleGame";
import ScratchCard       from "@/components/ScratchCard";
import LoveLetter        from "@/components/LoveLetter";

const ThreeBackground = dynamic(
  () => import("@/components/ThreeBackground"),
  { ssr: false }
);

export default function BirthdayPage() {
  return (
    <main className="relative min-h-screen bg-[#07070f]">
      <ThreeBackground />
      <FloatingParticles />

      {/* ── Original sections ── */}
      <BirthdayHero />
      <TheaterGallery />
      <WishesSection />

      {/* ── New sections ── */}
      <FilmStrip />
      <PolaroidBoard />
      <MemoryTimeline />
      <CandleGame />
      <ScratchCard />
      <LoveLetter />
    </main>
  );
}
