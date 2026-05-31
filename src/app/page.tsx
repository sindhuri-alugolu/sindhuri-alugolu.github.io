import AboutSection from "@/components/AboutSection";
import AchievementsSection from "@/components/AchievementsSection";
import ContactSection from "@/components/ContactSection";
import ExperienceSection from "@/components/ExperienceSection";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Nav from "@/components/Nav";
import ProjectsSection from "@/components/ProjectsSection";
import SkillsSection from "@/components/SkillsSection";
import StatsBar from "@/components/StatsBar";
import { getContent } from "@/lib/content";

export default async function HomePage() {
  const content = await getContent();

  return (
    <>
      <Nav />
      <main>
        <Hero profile={content.profile} />
        <StatsBar stats={content.stats} />
        <AboutSection about={content.about} competencies={content.competencies} />
        <ExperienceSection intro={content.experienceIntro} experience={content.experience} />
        <ProjectsSection projects={content.projects} />
        <SkillsSection
          education={content.education}
          technicalSkills={content.technicalSkills}
          languages={content.languages}
        />
        <AchievementsSection achievements={content.achievements} />
        <ContactSection profile={content.profile} />
      </main>
      <Footer />
    </>
  );
}
