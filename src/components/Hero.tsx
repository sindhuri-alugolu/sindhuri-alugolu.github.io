import Image from "next/image";
import { Mail, MapPin, Phone } from "lucide-react";
import type { Profile } from "@/lib/types";

interface HeroProps {
  profile: Profile;
}

export default function Hero({ profile }: HeroProps) {
  return (
    <header className="relative overflow-hidden bg-hero-from pt-[calc(4.5rem+3rem)] text-white md:pt-[calc(4.5rem+4.5rem)]">
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-hero-from via-[#152033] to-hero-to" />

      <div className="container-main relative pb-16 md:pb-24">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_280px] lg:gap-16">
          <div className="order-2 text-center lg:order-1 lg:text-left">
            <div className="mb-6 inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium tracking-wide text-slate-300">
              <span className="h-1.5 w-1.5 rounded-full bg-accent-light" />
              {profile.heroBadge || "Available for Training & Consulting"}
            </div>

            <h1 className="font-serif text-[clamp(2.125rem,4.5vw,3.5rem)] font-semibold leading-[1.08] tracking-tight">
              {profile.name}
            </h1>

            <p className="mt-4 text-lg font-medium text-slate-300 md:text-xl">
              {profile.title || profile.subtitle.replace("|", "·")}
            </p>

            <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-slate-400 lg:mx-0">
              {profile.heroBio}
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-3 lg:justify-start">
              <a href={`tel:${profile.phone}`} className="btn btn-primary">
                <Phone size={16} />
                {profile.phoneDisplay}
              </a>
              <a href={`mailto:${profile.email}`} className="btn btn-ghost-light">
                <Mail size={16} />
                Email Me
              </a>
            </div>

            <p className="mt-7 flex items-center justify-center gap-2 text-sm text-slate-500 lg:justify-start">
              <MapPin size={15} className="text-slate-400" />
              {profile.location}
            </p>
          </div>

          <div className="order-1 mx-auto lg:order-2 lg:mx-0">
            <div className="relative mx-auto w-fit">
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-accent-light/30 to-transparent blur-sm" />
              <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-1.5 shadow-2xl">
                <Image
                  src={profile.photo}
                  alt={profile.name}
                  width={280}
                  height={280}
                  priority
                  className="h-[220px] w-[220px] rounded-[calc(1rem-4px)] object-cover md:h-[280px] md:w-[280px]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
