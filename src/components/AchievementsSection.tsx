import { Award, Handshake, Newspaper, PawPrint, PenLine, Users } from "lucide-react";
import Reveal from "./Reveal";
import SectionHeader from "./SectionHeader";

const icons = [Newspaper, Users, Award, Handshake, PawPrint, PenLine];

interface AchievementsSectionProps {
  achievements: string[];
}

export default function AchievementsSection({ achievements }: AchievementsSectionProps) {
  return (
    <section className="py-20 md:py-28">
      <div className="container-main">
        <Reveal>
          <SectionHeader label="Recognition" title="Achievements & Highlights" />
        </Reveal>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {achievements.map((text, i) => {
            const Icon = icons[i % icons.length];
            return (
              <Reveal key={text.slice(0, 40)} delay={i * 0.04}>
                <div className="card h-full p-6">
                  <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-lg bg-accent-muted text-accent">
                    <Icon size={17} />
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
