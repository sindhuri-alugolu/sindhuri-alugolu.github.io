import fs from "fs/promises";
import path from "path";
import type { PortfolioContent } from "./types";

const LOCAL_PATH = path.join(process.cwd(), "data", "resume.json");
const PUBLIC_PATH = path.join(process.cwd(), "public", "data", "resume.json");

export function uid(prefix = "id"): string {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

export async function getContent(): Promise<PortfolioContent> {
  try {
    const raw = await fs.readFile(LOCAL_PATH, "utf8");
    return JSON.parse(raw) as PortfolioContent;
  } catch {
    const raw = await fs.readFile(PUBLIC_PATH, "utf8");
    return JSON.parse(raw) as PortfolioContent;
  }
}

export async function saveContent(data: PortfolioContent): Promise<{ savedAt: string }> {
  if (!data?.profile?.name) {
    throw new Error("Invalid portfolio data");
  }

  const json = JSON.stringify(data, null, 2);
  await fs.writeFile(LOCAL_PATH, json, "utf8");
  await fs.mkdir(path.dirname(PUBLIC_PATH), { recursive: true });
  await fs.writeFile(PUBLIC_PATH, json, "utf8");

  return { savedAt: new Date().toISOString() };
}

export function getAdminPin(): string {
  return process.env.ADMIN_PIN || process.env.NEXT_PUBLIC_ADMIN_PIN || "8532";
}

export function isGitHubPagesBuild(): boolean {
  return process.env.GITHUB_PAGES === "true" || process.env.NEXT_PUBLIC_GITHUB_PAGES === "true";
}
