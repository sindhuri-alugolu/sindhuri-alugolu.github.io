import { Building2, Calendar, User } from "lucide-react";
import Image from "next/image";
import Reveal from "./Reveal";
import SectionHeader from "./SectionHeader";
import type { Projects } from "@/lib/types";

interface ProjectsSectionProps {
  projects: Projects;
}

export default function ProjectsSection({ projects }: ProjectsSectionProps) {
  return (
    <section id="projects" className="relative py-20 md:py-28">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(59,130,246,0.05),transparent)]" />
      <div className="container-main relative">
        <Reveal>
          <SectionHeader
            label="Featured Work"
            title="Workshops & Projects"
            description={projects.intro}
          />
        </Reveal>

        <div className="grid gap-8 lg:grid-cols-2">
          {projects.items.map((project, i) => (
            <Reveal key={project.id} delay={i * 0.08}>
              <article className="section-panel card-shine group overflow-hidden transition-transform duration-300 hover:-translate-y-1">
                <div className="relative overflow-hidden bg-bg-subtle">
                  <Image
                    src={project.image}
                    alt={project.alt || project.title}
                    width={640}
                    height={360}
                    className="aspect-[16/9] w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0c1929]/70 via-[#0c1929]/10 to-transparent" />
                  <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-[0.6875rem] font-bold uppercase tracking-wide text-accent-dark shadow-sm backdrop-blur-sm">
                    <Calendar size={12} />
                    {project.tag || project.date}
                  </span>
                  <h3 className="absolute bottom-0 left-0 right-0 p-5 font-serif text-lg font-semibold leading-snug text-white md:text-xl">
                    {project.title}
                  </h3>
                </div>

                <div className="space-y-3 p-6 md:p-7">
                  <div className="flex items-start gap-3 text-sm text-text-muted">
                    <User size={16} className="mt-0.5 shrink-0 text-accent" strokeWidth={2} />
                    <p>
                      <span className="font-semibold text-text">Role</span>
                      {" · "}
                      {project.role}
                    </p>
                  </div>
                  <div className="flex items-start gap-3 text-sm text-text-muted">
                    <Building2 size={16} className="mt-0.5 shrink-0 text-accent" strokeWidth={2} />
                    <p>
                      <span className="font-semibold text-text">Organised by</span>
                      {" · "}
                      {project.organisedBy}
                    </p>
                  </div>
                  <div className="flex items-start gap-3 border-t border-border/80 pt-3 text-sm text-text-muted">
                    <Building2 size={16} className="mt-0.5 shrink-0 text-accent/70" strokeWidth={2} />
                    <p>
                      <span className="font-semibold text-text">Conducted by</span>
                      {" · "}
                      {project.conductedBy}
                    </p>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
