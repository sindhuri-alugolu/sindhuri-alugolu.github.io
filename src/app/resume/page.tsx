import type { Metadata } from "next";
import ResumeView from "@/components/resume/ResumeView";
import { getContent } from "@/lib/content";

export const metadata: Metadata = {
  title: "Resume / CV",
  description: "Full resume of Sindhuri Alugolu — Soft Skills Trainer & Communication Specialist.",
};

export default async function ResumePage() {
  const content = await getContent();
  return <ResumeView content={content} />;
}
