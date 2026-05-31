import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://sindhuri-alugolu.github.io"),
  title: {
    default: "Sindhuri Alugolu — Soft Skills Trainer",
    template: "%s | Sindhuri Alugolu",
  },
  description:
    "Soft Skills Trainer & Communication Specialist based in Visakhapatnam. Corporate training, curriculum design, and workplace readiness programs.",
  openGraph: {
    title: "Sindhuri Alugolu — Soft Skills Trainer",
    description:
      "Communication Specialist | Curriculum Designer | Corporate Trainer",
    type: "website",
    locale: "en_IN",
    images: [{ url: "/images/sindhu.jpeg", width: 749, height: 646, alt: "Sindhuri Alugolu" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sindhuri Alugolu — Soft Skills Trainer",
    description:
      "Communication Specialist | Curriculum Designer | Corporate Trainer",
    images: ["/images/sindhu.jpeg"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body>{children}</body>
    </html>
  );
}
