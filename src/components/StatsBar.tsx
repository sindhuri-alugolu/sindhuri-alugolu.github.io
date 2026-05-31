import Reveal from "./Reveal";
import type { Stat } from "@/lib/types";

interface StatsBarProps {
  stats: Stat[];
}

export default function StatsBar({ stats }: StatsBarProps) {
  return (
    <div className="relative z-10 -mt-8 md:-mt-10">
      <Reveal className="container-main">
        <div className="card grid grid-cols-2 divide-y divide-border md:grid-cols-4 md:divide-x md:divide-y-0">
          {stats.map((stat) => (
            <div key={stat.label} className="px-6 py-7 text-center md:px-8 md:py-8">
              <div className="font-serif text-[2rem] font-semibold leading-none tracking-tight text-accent-dark md:text-[2.25rem]">
                {stat.num}
              </div>
              <div className="mt-2 text-xs font-medium uppercase tracking-wide text-text-muted md:text-[0.8125rem] md:normal-case md:tracking-normal">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </Reveal>
    </div>
  );
}
