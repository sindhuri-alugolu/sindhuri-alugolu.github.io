import type { Metadata } from "next";
import SinglePageResumeView from "@/components/resume/SinglePageResumeView";
import { getContent } from "@/lib/content";

export const metadata: Metadata = {
  title: "One-Page Resume",
  description:
    "Single-page CV of Sindhuri Alugolu — Soft Skills Trainer & Communication Specialist.",
};

export default async function OnePageResumePage() {
  const content = await getContent();
  return <SinglePageResumeView content={content} />;
}
