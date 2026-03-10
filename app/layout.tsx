import type { Metadata } from "next";
import { Playfair_Display, Dancing_Script } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap"
});

const dancing = Dancing_Script({
  subsets: ["latin"],
  variable: "--font-dancing",
  display: "swap"
});

export const metadata: Metadata = {
  title: "Happy Birthday Theslin 🎂",
  description: "Wishing you the most magical 23rd birthday — March 11, 2026"
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${playfair.variable} ${dancing.variable}`}>
        {children}
      </body>
    </html>
  );
}
