"use client";

import { motion } from "framer-motion";
import { Calendar, GraduationCap, Layers } from "lucide-react";
import type { Stat } from "@/lib/types";

interface StatsBarProps {
  stats: Stat[];
}

const icons = [GraduationCap, Layers, Calendar];
const easeOut = [0.22, 1, 0.36, 1] as const;

export default function StatsBar({ stats }: StatsBarProps) {
  return (
    <div className="relative z-10 -mt-2 pb-6 md:-mt-4 md:pb-10">
      <div className="container-main">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, ease: easeOut }}
          className="grid gap-4 sm:grid-cols-3 sm:gap-5"
        >
          {stats.map((stat, i) => {
            const Icon = icons[i] ?? GraduationCap;
            return (
              <div
                key={stat.label}
                className="section-panel group relative overflow-hidden p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_48px_rgba(37,99,235,0.14)] md:p-7"
              >
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_100%_0%,rgba(59,130,246,0.08),transparent_55%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="relative flex flex-col items-center gap-4 text-center sm:flex-row sm:items-start sm:text-left">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 text-white shadow-[0_4px_14px_rgba(37,99,235,0.35)]">
                    <Icon size={20} strokeWidth={2} />
                  </span>
                  <div>
                    <div className="stat-num text-[2rem] font-semibold leading-none tracking-tight md:text-[2.25rem]">
                      {stat.num}
                    </div>
                    <div className="mt-2 text-sm font-medium text-text-muted">{stat.label}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}
