import { Check, Quote } from "lucide-react";
import Reveal from "./Reveal";
import SectionHeader from "./SectionHeader";
import type { About } from "@/lib/types";

interface AboutSectionProps {
  about: About;
  competencies: string[];
}

export default function AboutSection({ about, competencies }: AboutSectionProps) {
  const highlight = about.paragraphs[0];
  const rest = about.paragraphs.slice(1);

  return (
    <section id="about" className="pt-12 pb-20 md:pt-16 md:pb-28">
      <div className="container-main">
        <Reveal>
          <SectionHeader label={about.label} title={about.heading} />
        </Reveal>

        <div className="grid items-start gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          <div className="space-y-6">
            <Reveal>
              <blockquote className="section-panel relative overflow-hidden p-7 md:p-8">
                <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-blue-50" />
                <Quote
                  size={28}
                  className="relative mb-4 text-blue-400/80"
                  strokeWidth={1.75}
                  aria-hidden
                />
                <p className="relative text-[1.0625rem] font-medium leading-relaxed text-text md:text-lg">
                  {highlight}
                </p>
              </blockquote>
            </Reveal>

            {rest.length > 0 && (
              <Reveal className="space-y-4 text-[1.0625rem] leading-relaxed text-text-muted">
                {rest.map((p) => (
                  <p key={p.slice(0, 40)}>{p}</p>
                ))}
              </Reveal>
            )}
          </div>

          <div>
            <Reveal>
              <p className="mb-5 text-xs font-bold uppercase tracking-[0.18em] text-accent">
                Core Competencies
              </p>
            </Reveal>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {competencies.map((item, i) => (
                <Reveal key={item} delay={i * 0.04}>
                  <div className="group flex h-full items-start gap-3 rounded-xl border border-border/80 bg-white px-4 py-4 text-sm leading-snug text-text shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-[0_12px_32px_rgba(37,99,235,0.12)]">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-blue-700 text-white shadow-sm transition-transform duration-300 group-hover:scale-110">
                      <Check size={12} strokeWidth={3} />
                    </span>
                    <span className="font-medium">{item}</span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
