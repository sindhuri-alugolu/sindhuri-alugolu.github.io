import Image from "next/image";
import Reveal from "./Reveal";
import SectionHeader from "./SectionHeader";
import type { Projects } from "@/lib/types";

interface ProjectsSectionProps {
  projects: Projects;
}

export default function ProjectsSection({ projects }: ProjectsSectionProps) {
  return (
    <section id="projects" className="py-20 md:py-28">
      <div className="container-main">
        <Reveal>
          <SectionHeader
            label="Featured Work"
            title="Workshops & Projects"
            description={projects.intro}
          />
        </Reveal>

        <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
          {projects.items.map((project, i) => (
            <Reveal key={project.id} delay={i * 0.08}>
              <article className="card group overflow-hidden">
                <div className="relative overflow-hidden bg-bg-subtle">
                  <Image
                    src={project.image}
                    alt={project.alt || project.title}
                    width={640}
                    height={360}
                    className="aspect-[16/9] w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                </div>
                <div className="p-6 md:p-7">
                  <span className="inline-block rounded-md bg-accent-muted px-2.5 py-1 text-[0.6875rem] font-semibold uppercase tracking-wide text-accent-dark">
                    {project.tag || project.date}
                  </span>
                  <h3 className="mt-3 text-lg font-semibold leading-snug text-text">
                    {project.title}
                  </h3>
                  <dl className="mt-4 space-y-2 text-sm text-text-muted">
                    <div>
                      <dt className="sr-only">Role</dt>
                      <dd>
                        <span className="font-medium text-text">Role</span>
                        {" · "}
                        {project.role}
                      </dd>
                    </div>
                    <div>
                      <dt className="sr-only">Organised by</dt>
                      <dd>
                        <span className="font-medium text-text">Organised by</span>
                        {" · "}
                        {project.organisedBy}
                      </dd>
                    </div>
                    <div>
                      <dt className="sr-only">Conducted by</dt>
                      <dd>
                        <span className="font-medium text-text">Conducted by</span>
                        {" · "}
                        {project.conductedBy}
                      </dd>
                    </div>
                  </dl>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
