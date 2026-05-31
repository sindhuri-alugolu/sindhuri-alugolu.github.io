import { BookOpen, GraduationCap, Languages, Laptop } from "lucide-react";
import Reveal from "./Reveal";
import SectionHeader from "./SectionHeader";
import type { EducationItem } from "@/lib/types";

interface SkillsSectionProps {
  education: EducationItem[];
  technicalSkills: string[];
  languages: string[];
}

function PanelHeader({ icon: Icon, title }: { icon: typeof GraduationCap; title: string }) {
  return (
    <div className="mb-6 flex items-center gap-3 border-b border-border/80 pb-5">
      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 text-white shadow-[0_4px_14px_rgba(37,99,235,0.3)]">
        <Icon size={18} strokeWidth={2} />
      </span>
      <h3 className="font-serif text-lg font-semibold text-text">{title}</h3>
    </div>
  );
}

export default function SkillsSection({ education, technicalSkills, languages }: SkillsSectionProps) {
  return (
    <section id="skills" className="section-band border-t border-border/60 py-20 md:py-28">
      <div className="container-main">
        <Reveal>
          <SectionHeader label="Background" title="Education & Skills" />
        </Reveal>

        <Reveal className="grid gap-6 lg:grid-cols-2 lg:gap-8">
          <div className="section-panel p-7 md:p-8">
            <PanelHeader icon={GraduationCap} title="Education" />
            <div className="space-y-4">
              {education.map((edu) => (
                <div
                  key={edu.degree}
                  className="relative rounded-xl border border-border/60 bg-gradient-to-br from-white to-blue-50/30 p-5 transition-colors hover:border-blue-200"
                >
                  <span className="absolute -left-px top-5 h-8 w-1 rounded-full bg-gradient-to-b from-blue-400 to-blue-600" />
                  <p className="text-sm font-semibold leading-snug text-text">{edu.degree}</p>
                  <p className="mt-1.5 flex items-center gap-2 text-sm text-text-muted">
                    <BookOpen size={14} className="text-accent" />
                    {edu.school}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="section-panel p-7 md:p-8">
            <PanelHeader icon={Laptop} title="Technical Skills" />
            <div className="flex flex-wrap gap-2.5">
              {technicalSkills.map((skill) => (
                <span key={skill} className="skill-tag">
                  {skill}
                </span>
              ))}
            </div>

            <div className="mt-10">
              <PanelHeader icon={Languages} title="Languages" />
              <div className="flex flex-wrap gap-2.5">
                {languages.map((lang) => (
                  <span
                    key={lang}
                    className="skill-tag border-blue-200/80 bg-gradient-to-br from-blue-50 to-white"
                  >
                    {lang}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
