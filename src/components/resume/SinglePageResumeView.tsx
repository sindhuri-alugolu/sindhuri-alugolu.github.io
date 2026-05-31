import Image from "next/image";
import { Mail, MapPin, Phone } from "lucide-react";
import ResumeToolbar from "./ResumeToolbar";
import type { PortfolioContent } from "@/lib/types";

interface SinglePageResumeViewProps {
  content: PortfolioContent;
}

const EXPERIENCE_LIMIT = 5;
const BULLET_LIMIT = 2;
const ACHIEVEMENT_LIMIT = 4;

function parseTitle(title: string) {
  const parts = title.split(" | ");
  if (parts.length >= 2) {
    return { role: parts[0].trim(), org: parts.slice(1).join(" | ").trim() };
  }
  return { role: title, org: null };
}

export default function SinglePageResumeView({ content }: SinglePageResumeViewProps) {
  const { profile } = content;
  const experience = content.experience.slice(0, EXPERIENCE_LIMIT);
  const achievements = content.achievements.slice(0, ACHIEVEMENT_LIMIT);

  return (
    <div className="resume-page resume-one-page min-h-screen bg-[#f0f4ff] pb-12 print:bg-white print:pb-0">
      <ResumeToolbar
        variant="one-page"
        downloadName="Sindhuri-Alugolu-One-Page-Resume"
      />

      <article className="resume-one-page-container resume-container mx-auto my-5 w-[min(210mm,calc(100%-2rem))] rounded-lg bg-white p-6 shadow-[0_0_20px_rgba(0,0,0,0.08)] print:my-0 print:rounded-none print:p-0 print:shadow-none md:p-8">
        <header className="resume-one-page-header mb-5 flex gap-5 border-b-2 border-[#2563eb] pb-4 print:mb-3 print:pb-3">
          <Image
            src={profile.photo}
            alt={profile.name}
            width={88}
            height={88}
            className="h-[88px] w-[88px] shrink-0 rounded-lg border-2 border-[#2563eb]/20 object-cover object-top print:h-[72px] print:w-[72px]"
          />
          <div className="min-w-0 flex-1">
            <h1 className="font-serif text-[1.625rem] font-semibold leading-tight text-[#0f172a] print:text-xl">
              {profile.name}
            </h1>
            <p className="mt-1 text-sm font-medium text-[#2563eb]">{profile.subtitle}</p>
            <div className="mt-2.5 flex flex-wrap gap-x-4 gap-y-1 text-[0.6875rem] text-[#475569]">
              <a href={`tel:${profile.phone}`} className="inline-flex items-center gap-1">
                <Phone size={11} className="text-[#2563eb]" />
                {profile.phoneDisplay}
              </a>
              <a href={`mailto:${profile.email}`} className="inline-flex items-center gap-1">
                <Mail size={11} className="text-[#2563eb]" />
                {profile.email}
              </a>
              <span className="inline-flex items-center gap-1">
                <MapPin size={11} className="text-[#2563eb]" />
                {profile.location}
              </span>
            </div>
          </div>
        </header>

        <section className="resume-one-page-section mb-4 print:mb-3">
          <h2 className="resume-one-page-heading">Professional Summary</h2>
          <p className="text-[0.6875rem] leading-relaxed text-[#475569]">{content.summary}</p>
        </section>

        <div className="resume-one-page-grid mb-4 grid gap-4 print:mb-3 md:grid-cols-[1.35fr_1fr]">
          <section className="resume-one-page-section">
            <h2 className="resume-one-page-heading">Professional Experience</h2>
            <div className="space-y-3">
              {experience.map((exp) => {
                const { role, org } = parseTitle(exp.title);
                return (
                  <div key={exp.id} className="print:break-inside-avoid">
                    <div className="flex flex-wrap items-baseline justify-between gap-x-2 gap-y-0.5">
                      <h3 className="text-[0.6875rem] font-bold leading-snug text-[#0f172a]">
                        {role}
                      </h3>
                      <span className="shrink-0 text-[0.625rem] font-semibold text-[#2563eb]">
                        {exp.date}
                      </span>
                    </div>
                    {org && (
                      <p className="text-[0.625rem] font-medium text-[#2563eb]/90">{org}</p>
                    )}
                    <ul className="mt-1 space-y-0.5">
                      {exp.bullets.slice(0, BULLET_LIMIT).map((bullet) => (
                        <li
                          key={bullet.slice(0, 40)}
                          className="relative pl-3 text-[0.625rem] leading-snug text-[#475569] before:absolute before:left-0 before:content-['•']"
                        >
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </section>

          <div className="space-y-4">
            <section className="resume-one-page-section">
              <h2 className="resume-one-page-heading">Core Competencies</h2>
              <ul className="grid grid-cols-1 gap-1 sm:grid-cols-2">
                {content.competencies.map((item) => (
                  <li
                    key={item}
                    className="text-[0.625rem] leading-snug text-[#475569] before:mr-1 before:font-bold before:text-[#2563eb] before:content-['•']"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            <section className="resume-one-page-section">
              <h2 className="resume-one-page-heading">Education</h2>
              <div className="space-y-1.5">
                {content.education.map((edu) => (
                  <div key={edu.degree}>
                    <p className="text-[0.625rem] font-semibold leading-snug text-[#0f172a]">
                      {edu.degree}
                    </p>
                    <p className="text-[0.625rem] text-[#64748b]">{edu.school}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="resume-one-page-section">
              <h2 className="resume-one-page-heading">Skills & Languages</h2>
              <div className="flex flex-wrap gap-1">
                {content.technicalSkills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded bg-[#eff6ff] px-1.5 py-0.5 text-[0.5625rem] font-semibold text-[#1d4ed8]"
                  >
                    {skill}
                  </span>
                ))}
              </div>
              <p className="mt-1.5 text-[0.625rem] text-[#475569]">
                <strong className="text-[#0f172a]">Languages:</strong>{" "}
                {content.languages.join(", ")}
              </p>
            </section>
          </div>
        </div>

        <section className="resume-one-page-section border-t border-[#e2e8f0] pt-3 print:pt-2">
          <h2 className="resume-one-page-heading">Key Achievements</h2>
          <ul className="grid gap-1 sm:grid-cols-2">
            {achievements.map((item) => (
              <li
                key={item.slice(0, 40)}
                className="text-[0.625rem] leading-snug text-[#475569] before:mr-1 before:font-bold before:text-[#2563eb] before:content-['•']"
              >
                {item}
              </li>
            ))}
          </ul>
        </section>
      </article>
    </div>
  );
}
