import type { PortfolioContent } from "./types";

const REPO = process.env.NEXT_PUBLIC_GITHUB_REPO || "sindhuri-alugolu/sindhuri-alugolu.github.io";
const TOKEN = process.env.NEXT_PUBLIC_GITHUB_TOKEN || "";

function getHeaders() {
  return {
    Accept: "application/vnd.github+json",
    Authorization: `Bearer ${TOKEN}`,
    "X-GitHub-Api-Version": "2022-11-28",
  };
}

function toBase64(value: string): string {
  if (typeof window !== "undefined") {
    return btoa(unescape(encodeURIComponent(value)));
  }
  return Buffer.from(value, "utf8").toString("base64");
}

async function getFileSha(filePath: string): Promise<string | undefined> {
  const res = await fetch(
    `https://api.github.com/repos/${REPO}/contents/${filePath}?ref=main`,
    { headers: getHeaders() },
  );

  if (res.status === 404) return undefined;
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || `Could not read ${filePath} from GitHub`);
  }

  const data = await res.json();
  return data.sha as string;
}

async function updateFile(filePath: string, content: string, message: string) {
  const sha = await getFileSha(filePath);

  const res = await fetch(`https://api.github.com/repos/${REPO}/contents/${filePath}`, {
    method: "PUT",
    headers: {
      ...getHeaders(),
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message,
      content: toBase64(content),
      sha,
      branch: "main",
    }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || `Could not save ${filePath} to GitHub`);
  }
}

export function canSaveToGitHub(): boolean {
  return Boolean(TOKEN && REPO);
}

export async function saveContentToGitHub(data: PortfolioContent): Promise<{ savedAt: string }> {
  if (!canSaveToGitHub()) {
    throw new Error(
      "GitHub save is not configured. Add ADMIN_GITHUB_TOKEN as a repository secret for GitHub Pages.",
    );
  }

  const json = JSON.stringify(data, null, 2);
  const message = `Update portfolio content (${new Date().toISOString()})`;

  await updateFile("data/resume.json", json, message);
  await updateFile("public/data/resume.json", json, message);

  return { savedAt: new Date().toISOString() };
}

export async function fetchContentFromGitHub(): Promise<PortfolioContent> {
  const url = `https://raw.githubusercontent.com/${REPO}/main/public/data/resume.json?t=${Date.now()}`;
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error("Could not load portfolio content");
  return res.json() as Promise<PortfolioContent>;
}
