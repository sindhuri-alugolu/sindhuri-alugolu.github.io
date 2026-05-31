"use client";

import { Briefcase, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import Reveal from "./Reveal";
import SectionHeader from "./SectionHeader";
import type { ExperienceItem } from "@/lib/types";

interface ExperienceSectionProps {
  intro: string;
  experience: ExperienceItem[];
}

const VISIBLE_COUNT = 4;

function parseTitle(title: string) {
  const parts = title.split(" | ");
  if (parts.length >= 2) {
    return { role: parts[0].trim(), org: parts.slice(1).join(" | ").trim() };
  }
  return { role: title, org: null };
}

function ExperienceCard({ item, isLast }: { item: ExperienceItem; isLast?: boolean }) {
  const { role, org } = parseTitle(item.title);

  return (
    <article className="relative pl-10 md:pl-12">
      <span
        className="absolute left-0 top-6 z-[1] flex h-9 w-9 items-center justify-center rounded-full border-2 border-white bg-gradient-to-br from-blue-500 to-blue-700 text-white shadow-[0_4px_14px_rgba(37,99,235,0.35)] md:top-7"
        aria-hidden
      >
        <Briefcase size={14} strokeWidth={2.25} />
      </span>
      {!isLast && <span className="absolute left-[1.125rem] top-14 h-[calc(100%+1rem)] w-0.5 bg-gradient-to-b from-blue-200 to-blue-100 md:left-[1.375rem]" aria-hidden />}

      <div className="section-panel card-shine group p-6 md:p-8">
        <span className="mb-3 inline-flex w-fit max-w-full rounded-full bg-blue-50 px-3 py-1 text-[0.6875rem] font-bold uppercase leading-snug tracking-wide text-accent-dark">
          {item.date}
        </span>
        <h3 className="text-base font-semibold leading-snug text-text md:text-[1.0625rem]">
          {role}
        </h3>
        {org && <p className="mt-1.5 text-sm font-medium text-accent">{org}</p>}

        <ul className="mt-5 space-y-2.5 border-t border-border/80 pt-5">
          {item.bullets.map((bullet) => (
            <li
              key={bullet.slice(0, 50)}
              className="relative pl-5 text-sm leading-relaxed text-text-muted before:absolute before:left-0 before:top-[0.55em] before:h-1.5 before:w-1.5 before:rounded-full before:bg-gradient-to-br before:from-blue-400 before:to-blue-600"
            >
              {bullet}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

export default function ExperienceSection({ intro, experience }: ExperienceSectionProps) {
  const [expanded, setExpanded] = useState(false);
  const recent = experience.slice(0, VISIBLE_COUNT);
  const older = experience.slice(VISIBLE_COUNT);
  const visibleItems = expanded ? experience : recent;

  return (
    <section id="experience" className="section-band border-y border-border/60 py-20 md:py-28">
      <div className="container-main">
        <Reveal>
          <SectionHeader label="Career" title="Professional Experience" description={intro} />
        </Reveal>

        <Reveal className="relative space-y-6">
          {visibleItems.map((item, i) => (
            <ExperienceCard
              key={item.id}
              item={item}
              isLast={i === visibleItems.length - 1}
            />
          ))}

          {older.length > 0 && (
            <div className="flex justify-center pt-2">
              <button
                type="button"
                onClick={() => setExpanded((v) => !v)}
                className="btn btn-secondary shadow-sm"
              >
                {expanded ? (
                  <>
                    <ChevronUp size={16} />
                    Hide earlier experience
                  </>
                ) : (
                  <>
                    <ChevronDown size={16} />
                    Show {older.length} earlier roles
                  </>
                )}
              </button>
            </div>
          )}
        </Reveal>
      </div>
    </section>
  );
}
