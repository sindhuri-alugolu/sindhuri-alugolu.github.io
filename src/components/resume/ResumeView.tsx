import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Briefcase,
  CheckCircle,
  GraduationCap,
  Heart,
  Mail,
  MapPin,
  Phone,
  Star,
  Target,
  User,
} from "lucide-react";
import DownloadPdfButton from "./DownloadPdfButton";
import type { PortfolioContent } from "@/lib/types";

interface ResumeViewProps {
  content: PortfolioContent;
}

export default function ResumeView({ content }: ResumeViewProps) {
  const { profile, personalDetails, personalSnapshot, declaration } = content;

  return (
    <div className="resume-page min-h-screen bg-[#f9f9f9] pb-12 print:bg-white print:pb-0">
      <div className="no-print sticky top-0 z-50 border-b border-border bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex w-[min(1000px,calc(100%-2rem))] items-center justify-between py-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:text-accent-dark"
          >
            <ArrowLeft size={16} />
            Back to Portfolio
          </Link>
          <DownloadPdfButton />
        </div>
      </div>

      <article className="resume-container mx-auto my-5 w-[min(1000px,calc(100%-2rem))] rounded-[10px] bg-white p-5 shadow-[0_0_20px_rgba(0,0,0,0.1)] print:my-0 print:shadow-none">
        {/* Header */}
        <header className="relative overflow-hidden rounded-[10px] bg-gradient-to-br from-[#2980b9] to-[#2c3e50] px-5 py-8 text-center text-white print:bg-[#2980b9]">
          <div className="relative z-10">
            <Image
              src={profile.photo}
              alt={profile.name}
              width={150}
              height={150}
              className="mx-auto mb-4 h-[150px] w-[150px] rounded-full border-4 border-white object-cover shadow-lg"
            />
            <h1 className="font-serif text-4xl font-semibold">{profile.name}</h1>
            <p className="mt-2 text-lg text-slate-100">{profile.subtitle}</p>
            <div className="mt-4 flex flex-wrap justify-center gap-3">
              <a
                href={`tel:${profile.phone}`}
                className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/15 px-4 py-2 text-sm backdrop-blur-sm"
              >
                <Phone size={14} />
                {profile.phoneDisplay}
              </a>
              <a
                href={`mailto:${profile.email}`}
                className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/15 px-4 py-2 text-sm backdrop-blur-sm"
              >
                <Mail size={14} />
                {profile.email}
              </a>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/15 px-4 py-2 text-sm backdrop-blur-sm">
                <MapPin size={14} />
                {profile.location}
              </span>
            </div>
          </div>
        </header>

        {/* Summary */}
        <ResumeSection title="Professional Summary" icon={<User size={18} />}>
          <p className="text-sm leading-relaxed text-[#555]">{content.summary}</p>
        </ResumeSection>

        {/* Competencies */}
        <ResumeSection title="Core Competencies" icon={<CheckCircle size={18} />}>
          <ul className="grid gap-2 sm:grid-cols-2">
            {content.competencies.map((c) => (
              <li key={c} className="flex items-start gap-2 text-sm text-[#555]">
                <CheckCircle className="mt-0.5 shrink-0 text-[#2980b9]" size={14} />
                {c}
              </li>
            ))}
          </ul>
        </ResumeSection>

        {/* Experience */}
        <ResumeSection title="Professional Experience" icon={<Briefcase size={18} />}>
          <div className="space-y-6">
            {content.experience.map((exp) => (
              <div key={exp.id}>
                <h3 className="text-base font-bold text-[#2980b9]">{exp.title}</h3>
                <p className="mb-2 text-xs font-semibold text-[#2980b9]/80">{exp.date}</p>
                <ul className="space-y-1">
                  {exp.bullets.map((b) => (
                    <li key={b.slice(0, 40)} className="text-sm text-[#555]">
                      • {b}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </ResumeSection>

        {/* Projects */}
        <ResumeSection title="Workshops & Projects" icon={<Star size={18} />}>
          <p className="mb-4 text-sm text-[#555]">{content.projects.intro}</p>
          <div className="space-y-5">
            {content.projects.items.map((p) => (
              <div key={p.id} className="rounded-lg border border-[#e0e0e0] p-4">
                <h3 className="font-bold text-[#2980b9]">{p.title}</h3>
                <p className="text-xs font-semibold text-[#2980b9]/80">{p.date}</p>
                <p className="mt-2 text-sm text-[#555]">
                  <strong>Role:</strong> {p.role}
                </p>
                <p className="text-sm text-[#555]">
                  <strong>Organised by:</strong> {p.organisedBy}
                </p>
                <p className="text-sm text-[#555]">
                  <strong>Conducted by:</strong> {p.conductedBy}
                </p>
              </div>
            ))}
          </div>
        </ResumeSection>

        {/* Job Description */}
        <ResumeSection title={content.jobDescription.title} icon={<Briefcase size={18} />}>
          <ul className="space-y-2">
            {content.jobDescription.items.map((item) => (
              <li key={item.slice(0, 50)} className="text-sm text-[#555]">
                • {item}
              </li>
            ))}
          </ul>
        </ResumeSection>

        {/* Education & Skills */}
        <div className="mb-8 grid gap-6 md:grid-cols-2">
          <ResumeSection title="Education" icon={<GraduationCap size={18} />} compact>
            {content.education.map((edu) => (
              <div key={edu.degree} className="mb-3 last:mb-0">
                <p className="text-sm font-semibold">{edu.degree}</p>
                <p className="text-xs text-[#555]">{edu.school}</p>
              </div>
            ))}
          </ResumeSection>

          <ResumeSection title="Technical Skills & Languages" icon={<Star size={18} />} compact>
            <div className="mb-4 flex flex-wrap gap-2">
              {content.technicalSkills.map((s) => (
                <span
                  key={s}
                  className="rounded bg-[#2980b9] px-3 py-1 text-xs font-semibold text-white"
                >
                  {s}
                </span>
              ))}
            </div>
            <p className="text-sm text-[#555]">
              <strong>Languages:</strong> {content.languages.join(", ")}
            </p>
          </ResumeSection>
        </div>

        {/* Achievements */}
        <ResumeSection title="Achievements" icon={<Star size={18} />}>
          <div className="grid gap-3 sm:grid-cols-2">
            {content.achievements.map((a) => (
              <div
                key={a.slice(0, 40)}
                className="rounded-r-[10px] border-l-4 border-[#2980b9] bg-[#f8f8f8] p-3 text-sm text-[#555]"
              >
                {a}
              </div>
            ))}
          </div>
        </ResumeSection>

        {/* Extracurricular */}
        <ResumeSection title="Extracurricular Activities" icon={<Heart size={18} />}>
          <ul className="space-y-2">
            {content.extracurricular.map((item) => (
              <li key={item.slice(0, 40)} className="text-sm text-[#555]">
                • {item}
              </li>
            ))}
          </ul>
        </ResumeSection>

        {/* Personal Details */}
        <ResumeSection title="Personal Details" icon={<User size={18} />}>
          <div className="grid gap-2 text-sm text-[#555] sm:grid-cols-2">
            <p>
              <strong>Date of Birth:</strong> {personalDetails.dob}
            </p>
            <p>
              <strong>Nationality:</strong> {personalDetails.nationality}
            </p>
            <p>
              <strong>Languages:</strong> {personalDetails.languages}
            </p>
            <p>
              <strong>Location:</strong> {personalDetails.location}
            </p>
          </div>
        </ResumeSection>

        {/* Personal Snapshot */}
        <ResumeSection title="Personal Snapshot" icon={<Target size={18} />}>
          <div className="mb-6 rounded border border-[#e0e0e0] bg-[#f4f4f4] p-5 text-center">
            <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-[#2980b9] text-white">
              <User size={24} />
            </div>
            <h3 className="mb-2 text-sm font-bold uppercase tracking-wide text-[#2980b9]">
              Personality Overview
            </h3>
            <p className="text-sm text-[#555]">{personalSnapshot.personality}</p>
          </div>

          <div className="mb-6 grid gap-3 sm:grid-cols-2">
            {personalSnapshot.traits.map((trait) => (
              <div
                key={trait.title}
                className="flex items-center gap-3 border-l-[3px] border-[#2980b9] bg-[#f4f4f4] p-4"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#2980b9] text-white">
                  <Star size={16} />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase text-[#2980b9]">{trait.title}</h4>
                  <p className="text-xs text-[#555]">{trait.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <SnapshotCard title="Pursuits & Interests" items={personalSnapshot.pursuits} />
            <SnapshotCard title="Short-Term Goals" items={personalSnapshot.shortTermGoals} />
            <SnapshotCard title="Long-Term Goals" items={personalSnapshot.longTermGoals} />
          </div>
        </ResumeSection>

        {/* Declaration */}
        <section className="mt-8 rounded-[10px] border border-[#e0e0e0] bg-[#f4f4f4] p-6">
          <h2 className="mb-3 text-lg font-bold text-[#2980b9]">Declaration</h2>
          <p className="text-sm text-[#555]">{declaration.text}</p>
          <div className="mt-6 flex flex-wrap justify-between gap-4 text-sm text-[#555]">
            <p>
              <strong>Place:</strong> {declaration.place}
            </p>
            <p>
              <strong>Signature:</strong> {declaration.signature}
            </p>
          </div>
        </section>
      </article>
    </div>
  );
}

function ResumeSection({
  title,
  icon,
  children,
  compact,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  compact?: boolean;
}) {
  return (
    <section className={`${compact ? "mb-0" : "mb-8"} rounded-[10px] bg-[#f4f4f4] p-5 print:break-inside-avoid`}>
      <h2 className="mb-4 flex items-center gap-2 border-b-2 border-[#2980b9]/20 pb-2 text-xl font-bold text-[#2980b9]">
        {icon}
        {title}
      </h2>
      {children}
    </section>
  );
}

function SnapshotCard({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="overflow-hidden rounded border border-[#e0e0e0]">
      <div className="flex items-center gap-2 bg-[#2980b9] px-4 py-3 text-sm font-bold uppercase tracking-wide text-white">
        <Target size={16} />
        {title}
      </div>
      <ul className="space-y-1 p-4">
        {items.map((item) => (
          <li key={item} className="text-sm text-[#555]">
            • {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
