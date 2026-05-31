import { Check } from "lucide-react";
import Reveal from "./Reveal";
import SectionHeader from "./SectionHeader";
import type { About } from "@/lib/types";

interface AboutSectionProps {
  about: About;
  competencies: string[];
}

export default function AboutSection({ about, competencies }: AboutSectionProps) {
  return (
    <section id="about" className="py-20 md:py-28">
      <div className="container-main">
        <Reveal>
          <SectionHeader label={about.label} title={about.heading} />
        </Reveal>

        <div className="grid items-start gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
          <Reveal className="space-y-5 text-[1.0625rem] leading-relaxed text-text-muted">
            {about.paragraphs.map((p) => (
              <p key={p.slice(0, 40)}>{p}</p>
            ))}
          </Reveal>

          <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
            {competencies.map((item, i) => (
              <Reveal key={item} delay={i * 0.04}>
                <div className="flex items-start gap-3 rounded-lg border border-border bg-surface px-4 py-3.5 text-sm leading-snug text-text transition-colors hover:border-slate-300 hover:bg-bg-subtle/50">
                  <Check className="mt-0.5 shrink-0 text-accent" size={14} strokeWidth={2.5} />
                  <span>{item}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
