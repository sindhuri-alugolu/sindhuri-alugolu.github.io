"use client";

import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import Reveal from "./Reveal";
import SectionHeader from "./SectionHeader";
import type { ExperienceItem } from "@/lib/types";

interface ExperienceSectionProps {
  intro: string;
  experience: ExperienceItem[];
}

const VISIBLE_COUNT = 4;

function ExperienceCard({ item }: { item: ExperienceItem }) {
  return (
    <article className="card p-6 md:p-7">
      <div className="mb-3 flex flex-wrap items-baseline justify-between gap-2">
        <p className="text-xs font-semibold uppercase tracking-wide text-accent">{item.date}</p>
      </div>
      <h3 className="text-base font-semibold leading-snug text-text md:text-[1.0625rem]">
        {item.title}
      </h3>
      <ul className="mt-4 space-y-2.5">
        {item.bullets.map((bullet) => (
          <li
            key={bullet.slice(0, 50)}
            className="relative pl-4 text-sm leading-relaxed text-text-muted before:absolute before:left-0 before:top-[0.6em] before:h-1 before:w-1 before:rounded-full before:bg-accent-light"
          >
            {bullet}
          </li>
        ))}
      </ul>
    </article>
  );
}

export default function ExperienceSection({ intro, experience }: ExperienceSectionProps) {
  const [expanded, setExpanded] = useState(false);
  const recent = experience.slice(0, VISIBLE_COUNT);
  const older = experience.slice(VISIBLE_COUNT);

  return (
    <section id="experience" className="border-y border-border bg-bg-subtle/50 py-20 md:py-28">
      <div className="container-main">
        <Reveal>
          <SectionHeader label="Career" title="Professional Experience" description={intro} />
        </Reveal>

        <Reveal className="space-y-4">
          {recent.map((item) => (
            <ExperienceCard key={item.id} item={item} />
          ))}

          {older.length > 0 && expanded && (
            <div className="space-y-4 pt-1">
              {older.map((item) => (
                <ExperienceCard key={item.id} item={item} />
              ))}
            </div>
          )}

          {older.length > 0 && (
            <button
              type="button"
              onClick={() => setExpanded((v) => !v)}
              className="btn btn-secondary mt-2"
            >
              {expanded ? (
                <>
                  <ChevronUp size={16} />
                  Hide earlier experience
                </>
              ) : (
                <>
                  <ChevronDown size={16} />
                  Show earlier experience
                </>
              )}
            </button>
          )}
        </Reveal>
      </div>
    </section>
  );
}
