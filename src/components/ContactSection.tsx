import { Mail, MapPin, Phone } from "lucide-react";
import Reveal from "./Reveal";
import type { Profile } from "@/lib/types";

interface ContactSectionProps {
  profile: Profile;
}

export default function ContactSection({ profile }: ContactSectionProps) {
  return (
    <section id="contact" className="border-t border-border bg-hero-from py-20 text-white md:py-24">
      <Reveal className="container-main text-center">
        <span className="section-label text-accent-light">Get in Touch</span>
        <h2 className="section-title mt-3 text-white">Let&apos;s Connect</h2>
        <p className="section-desc mx-auto text-slate-400">
          {profile.contactCTA ||
            "Open to corporate training, guest faculty roles, curriculum consulting, and workshop facilitation."}
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <a href={`tel:${profile.phone}`} className="btn btn-primary min-w-[200px]">
            <Phone size={16} />
            {profile.phoneDisplay}
          </a>
          <a href={`mailto:${profile.email}`} className="btn btn-ghost-light min-w-[200px]">
            <Mail size={16} />
            {profile.email}
          </a>
          <a
            href="https://maps.google.com/?q=Visakhapatnam,Andhra+Pradesh"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-ghost-light min-w-[200px]"
          >
            <MapPin size={16} />
            Visakhapatnam, A.P.
          </a>
        </div>
      </Reveal>
    </section>
  );
}
