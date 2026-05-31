import { GraduationCap, Languages, Laptop } from "lucide-react";
import Reveal from "./Reveal";
import SectionHeader from "./SectionHeader";
import type { EducationItem } from "@/lib/types";

interface SkillsSectionProps {
  education: EducationItem[];
  technicalSkills: string[];
  languages: string[];
}

function SkillTag({ label }: { label: string }) {
  return (
    <span className="inline-flex rounded-md border border-border bg-bg-subtle/60 px-3 py-1.5 text-xs font-medium text-text">
      {label}
    </span>
  );
}

export default function SkillsSection({ education, technicalSkills, languages }: SkillsSectionProps) {
  return (
    <section id="skills" className="border-t border-border bg-bg-subtle/50 py-20 md:py-28">
      <div className="container-main">
        <Reveal>
          <SectionHeader label="Background" title="Education & Skills" />
        </Reveal>

        <Reveal className="grid gap-6 lg:grid-cols-2 lg:gap-8">
          <div className="card p-7 md:p-8">
            <div className="mb-6 flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent-muted text-accent">
                <GraduationCap size={18} />
              </div>
              <h3 className="text-base font-semibold text-text">Education</h3>
            </div>
            <div className="space-y-5">
              {education.map((edu) => (
                <div key={edu.degree} className="border-l-2 border-accent/20 pl-4">
                  <p className="text-sm font-semibold leading-snug text-text">{edu.degree}</p>
                  <p className="mt-1 text-sm text-text-muted">{edu.school}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="card p-7 md:p-8">
            <div className="mb-6 flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent-muted text-accent">
                <Laptop size={18} />
              </div>
              <h3 className="text-base font-semibold text-text">Technical Skills</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {technicalSkills.map((skill) => (
                <SkillTag key={skill} label={skill} />
              ))}
            </div>

            <div className="mt-8 flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent-muted text-accent">
                <Languages size={18} />
              </div>
              <h3 className="text-base font-semibold text-text">Languages</h3>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {languages.map((lang) => (
                <SkillTag key={lang} label={lang} />
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
