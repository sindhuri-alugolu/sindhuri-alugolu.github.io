export interface Profile {
  name: string;
  subtitle: string;
  photo: string;
  heroPhoto?: string;
  phone: string;
  phoneDisplay: string;
  email: string;
  location: string;
  heroBadge?: string;
  heroBio?: string;
  title?: string;
  contactCTA?: string;
}

export interface Stat {
  num: string;
  label: string;
}

export interface About {
  label: string;
  heading: string;
  paragraphs: string[];
}

export interface ExperienceItem {
  id: string;
  title: string;
  date: string;
  bullets: string[];
  highlight?: boolean;
}

export interface ProjectItem {
  id: string;
  title: string;
  date: string;
  tag?: string;
  role: string;
  organisedBy: string;
  conductedBy: string;
  image: string;
  alt: string;
}

export interface Projects {
  intro: string;
  items: ProjectItem[];
}

export interface JobDescription {
  title: string;
  items: string[];
}

export interface EducationItem {
  degree: string;
  school: string;
}

export interface PersonalDetails {
  dob: string;
  nationality: string;
  languages: string;
  location: string;
}

export interface Trait {
  title: string;
  desc: string;
}

export interface PersonalSnapshot {
  personality: string;
  traits: Trait[];
  pursuits: string[];
  shortTermGoals: string[];
  longTermGoals: string[];
}

export interface Declaration {
  text: string;
  place: string;
  signature: string;
}

export interface PortfolioContent {
  profile: Profile;
  stats: Stat[];
  summary: string;
  about: About;
  competencies: string[];
  experienceIntro: string;
  experience: ExperienceItem[];
  projects: Projects;
  jobDescription: JobDescription;
  education: EducationItem[];
  technicalSkills: string[];
  languages: string[];
  achievements: string[];
  extracurricular: string[];
  personalDetails: PersonalDetails;
  personalSnapshot: PersonalSnapshot;
  declaration: Declaration;
}
