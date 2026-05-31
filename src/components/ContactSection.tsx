import { Mail, MapPin, Phone, Sparkles } from "lucide-react";
import Reveal from "./Reveal";
import type { Profile } from "@/lib/types";

interface ContactSectionProps {
  profile: Profile;
}

const contactLinks = (profile: Profile) => [
  {
    icon: Phone,
    label: "Phone",
    value: profile.phoneDisplay,
    href: `tel:${profile.phone}`,
  },
  {
    icon: Mail,
    label: "Email",
    value: profile.email,
    href: `mailto:${profile.email}`,
  },
  {
    icon: MapPin,
    label: "Location",
    value: profile.location,
    href: "https://maps.google.com/?q=Visakhapatnam,Andhra+Pradesh",
    external: true,
  },
];

export default function ContactSection({ profile }: ContactSectionProps) {
  const links = contactLinks(profile);

  return (
    <section id="contact" className="relative overflow-hidden py-24 md:py-32">
      <div className="hero-mesh absolute inset-0" />
      <div className="hero-grid pointer-events-none absolute inset-0 opacity-60" />
      <div className="hero-aurora pointer-events-none absolute inset-0 opacity-50" />
      <div className="pointer-events-none absolute -left-20 top-0 h-80 w-80 rounded-full bg-blue-500/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-indigo-500/15 blur-3xl" />

      <div className="container-main relative">
        <Reveal className="text-center text-white">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-blue-200 backdrop-blur-md">
            <Sparkles size={13} />
            Get in Touch
          </div>
          <h2 className="font-serif text-[clamp(2rem,4vw,2.75rem)] font-semibold tracking-tight">
            <span className="gradient-text">Let&apos;s Connect</span>
          </h2>
          <div className="section-title-accent mx-auto mt-4 bg-gradient-to-r from-blue-300 to-white/80" />
          <p className="mx-auto mt-5 max-w-lg text-base leading-relaxed text-slate-300">
            {profile.contactCTA ||
              "Open to corporate training, guest faculty roles, curriculum consulting, and workshop facilitation."}
          </p>
        </Reveal>

        <Reveal className="mt-12 grid gap-4 sm:grid-cols-3 sm:gap-5">
          {links.map(({ icon: Icon, label, value, href, external }) => (
            <a
              key={label}
              href={href}
              {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="group flex flex-col items-center rounded-2xl border border-white/10 bg-white/[0.06] p-6 text-center backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-white/25 hover:bg-white/[0.1] hover:shadow-[0_16px_48px_rgba(0,0,0,0.25)] md:p-7"
            >
              <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 text-white shadow-[0_4px_20px_rgba(37,99,235,0.45)] transition-transform duration-300 group-hover:scale-110">
                <Icon size={20} strokeWidth={2} />
              </span>
              <span className="text-[0.6875rem] font-bold uppercase tracking-[0.15em] text-blue-200/80">
                {label}
              </span>
              <span className="mt-2 text-sm font-medium leading-snug text-white">{value}</span>
            </a>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
