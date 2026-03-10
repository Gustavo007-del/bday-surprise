"use client";

import dynamic from "next/dynamic";
import BirthdayHero      from "@/components/BirthdayHero";
import TheaterGallery    from "@/components/TheaterGallery";
import WishesSection     from "@/components/WishesSection";
import FloatingParticles from "@/components/FloatingParticles";

// Three.js must be loaded client-side only (no SSR)
const ThreeBackground = dynamic(
  () => import("@/components/ThreeBackground"),
  { ssr: false }
);

export default function BirthdayPage() {
  return (
    <main className="relative min-h-screen bg-[#07070f]">
      {/* Layer 0 – Three.js particle universe (fixed) */}
      <ThreeBackground />

      {/* Layer 1 – floating emoji canvas (fixed) */}
      <FloatingParticles />

      {/* Layer 2 – page sections */}
      <BirthdayHero />
      <TheaterGallery />
      <WishesSection />
    </main>
  );
}
