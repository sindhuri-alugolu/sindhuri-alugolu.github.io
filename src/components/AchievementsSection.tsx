import {
  Award,
  ClipboardCheck,
  Heart,
  Newspaper,
  PawPrint,
  Users,
  type LucideIcon,
} from "lucide-react";
import Reveal from "./Reveal";
import SectionHeader from "./SectionHeader";

function iconForAchievement(text: string): LucideIcon {
  const lower = text.toLowerCase();
  if (lower.includes("newspaper") || lower.includes("featured")) return Newspaper;
  if (lower.includes("animal") || lower.includes("welfare") || lower.includes("environmental"))
    return PawPrint;
  if (lower.includes("interview panel")) return ClipboardCheck;
  if (lower.includes("10,000") || lower.includes("7,000") || lower.includes("batches")) return Users;
  if (lower.includes("mentor") || lower.includes("volunteer")) return Heart;
  if (lower.includes("communication") || lower.includes("recogniz")) return Award;
  return Award;
}

interface AchievementsSectionProps {
  achievements: string[];
}

export default function AchievementsSection({ achievements }: AchievementsSectionProps) {
  return (
    <section id="achievements" className="py-20 md:py-28">
      <div className="container-main">
        <Reveal>
          <SectionHeader
            label="Recognition"
            title="Achievements & Highlights"
            align="center"
          />
        </Reveal>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {achievements.map((text, i) => {
            const Icon = iconForAchievement(text);
            return (
              <Reveal key={text.slice(0, 40)} delay={i * 0.04}>
                <div className="section-panel card-shine group relative h-full overflow-hidden p-6 transition-transform duration-300 hover:-translate-y-1 md:p-7">
                  <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-400 via-blue-600 to-indigo-600 opacity-80 transition-opacity group-hover:opacity-100" />
                  <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 text-white shadow-[0_4px_14px_rgba(37,99,235,0.35)] transition-transform duration-300 group-hover:scale-105">
                    <Icon size={18} strokeWidth={2} />
                  </div>
                  <p className="text-sm leading-relaxed text-text-muted">{text}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
