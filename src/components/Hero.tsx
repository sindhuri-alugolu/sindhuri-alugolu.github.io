"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowDown, Mail, MapPin, Phone, Sparkles } from "lucide-react";
import type { Profile, Stat } from "@/lib/types";

interface HeroProps {
  profile: Profile;
  stats: Stat[];
}

const sectors = ["Hospitality", "Aviation", "Corporate", "Academic"];

const easeOut = [0.22, 1, 0.36, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, delay: i * 0.1, ease: easeOut },
  }),
};

export default function Hero({ profile, stats }: HeroProps) {
  const heroImage = profile.heroPhoto || profile.photo;
  const [firstName, ...rest] = profile.name.split(" ");
  const lastName = rest.join(" ");

  return (
    <header className="hero-mesh relative min-h-[100svh] overflow-hidden pt-[calc(4.5rem+2rem)] md:pt-[calc(4.5rem+3rem)]">
      <div className="hero-grid pointer-events-none absolute inset-0" />
      <div className="hero-aurora pointer-events-none absolute inset-0" />
      <div className="hero-noise pointer-events-none absolute inset-0 opacity-[0.35]" />

      <div className="pointer-events-none absolute -left-40 top-1/4 h-[28rem] w-[28rem] rounded-full bg-blue-500/20 blur-[100px] animate-pulse-glow" />
      <div className="pointer-events-none absolute -right-32 top-1/3 h-80 w-80 rounded-full bg-sky-400/15 blur-[90px] animate-pulse-glow [animation-delay:1.5s]" />
      <div className="pointer-events-none absolute bottom-32 left-1/2 h-64 w-96 -translate-x-1/2 rounded-full bg-indigo-600/20 blur-[80px]" />

      <div className="container-main relative flex min-h-[calc(100svh-4.5rem-2rem)] flex-col justify-center pb-32 md:pb-36">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 xl:gap-20">
          <div className="order-2 text-center lg:order-1 lg:text-left">
            <motion.div
              custom={0}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-white/20 bg-white/[0.07] px-4 py-2 text-xs font-semibold tracking-wide text-blue-100 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-md"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              <Sparkles size={13} className="text-blue-300" />
              {profile.heroBadge || "Available for Training & Consulting"}
            </motion.div>

            <motion.div custom={1} initial="hidden" animate="visible" variants={fadeUp}>
              <p className="mb-3 text-[0.6875rem] font-bold uppercase tracking-[0.22em] text-blue-300/80">
                {profile.title || profile.subtitle.replace("|", "·")}
              </p>
              <h1 className="font-serif text-[clamp(2.5rem,6vw,4.25rem)] font-semibold leading-[1.02] tracking-tight text-white">
                {firstName}
                {lastName && (
                  <>
                    <br />
                    <span className="gradient-text-hero">{lastName}</span>
                  </>
                )}
              </h1>
            </motion.div>

            <motion.p
              custom={2}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="mx-auto mt-6 max-w-xl text-[1.0625rem] leading-[1.8] text-slate-300/90 lg:mx-0"
            >
              {profile.heroBio}
            </motion.p>

            <motion.div
              custom={3}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="mt-7 flex flex-wrap justify-center gap-2 lg:justify-start"
            >
              {sectors.map((sector) => (
                <span
                  key={sector}
                  className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-[0.6875rem] font-semibold uppercase tracking-wider text-blue-100/90 backdrop-blur-sm"
                >
                  {sector}
                </span>
              ))}
            </motion.div>

            <motion.div
              custom={4}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="mt-10 flex flex-wrap justify-center gap-3 lg:justify-start"
            >
              <a href={`tel:${profile.phone}`} className="btn btn-primary group">
                <Phone size={16} className="transition-transform group-hover:scale-110" />
                {profile.phoneDisplay}
              </a>
              <a href={`mailto:${profile.email}`} className="btn btn-ghost-light group">
                <Mail size={16} className="transition-transform group-hover:scale-110" />
                Email Me
              </a>
            </motion.div>

            <motion.p
              custom={5}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="mt-8 flex items-center justify-center gap-2.5 text-sm text-slate-400 lg:justify-start"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/[0.06]">
                <MapPin size={14} className="text-blue-300" />
              </span>
              {profile.location}
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: easeOut }}
            className="order-1 mx-auto lg:order-2"
          >
            <div className="hero-portrait animate-float relative mx-auto w-fit">
              <div className="hero-portrait-ring absolute inset-0 rounded-[2rem]" aria-hidden />
              <div className="hero-portrait-ring hero-portrait-ring--delay absolute inset-0 rounded-[2rem]" aria-hidden />

              {stats.slice(0, 2).map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, x: i === 0 ? 12 : -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + i * 0.15, duration: 0.5 }}
                  className={`hero-floating-stat hidden flex-col gap-0.5 lg:flex ${
                    i === 0
                      ? "left-full top-6 ml-3 xl:ml-4"
                      : "right-full bottom-10 mr-3 xl:mr-4"
                  }`}
                >
                  <span className="hero-floating-stat-num">{stat.num}</span>
                  <span className="hero-floating-stat-label">{stat.label}</span>
                </motion.div>
              ))}

              <div className="relative overflow-hidden rounded-[1.75rem] border border-white/15 bg-gradient-to-br from-[#132238] via-[#0c1929] to-[#1e3a8a]/40 p-3 shadow-[0_40px_80px_rgba(0,0,0,0.45),0_0_0_1px_rgba(255,255,255,0.05)_inset]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(96,165,250,0.15),transparent_55%)]" />
                <Image
                  src={heroImage}
                  alt={profile.name}
                  width={360}
                  height={360}
                  priority
                  className="relative h-[260px] w-[260px] rounded-[1.35rem] object-cover object-top md:h-[340px] md:w-[340px] lg:h-[380px] lg:w-[380px]"
                />
              </div>
            </div>
          </motion.div>
        </div>

        <motion.a
          href="#about"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-blue-200/60 transition-colors hover:text-blue-100 md:flex"
          aria-label="Scroll to about section"
        >
          <span className="text-[0.625rem] font-semibold uppercase tracking-[0.2em]">Explore</span>
          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/[0.06] backdrop-blur-sm">
            <ArrowDown size={16} className="animate-bounce" />
          </span>
        </motion.a>
      </div>

      <div className="hero-wave pointer-events-none absolute inset-x-0 bottom-0 text-bg" aria-hidden>
        <svg viewBox="0 0 1440 80" fill="currentColor" preserveAspectRatio="none" className="block h-12 w-full md:h-16">
          <path d="M0,48 C360,96 720,0 1080,48 C1260,72 1380,64 1440,56 L1440,80 L0,80 Z" />
        </svg>
      </div>
    </header>
  );
}
