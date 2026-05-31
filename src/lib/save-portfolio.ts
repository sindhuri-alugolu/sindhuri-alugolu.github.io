import type { PortfolioContent } from "./types";
import { canSaveToGitHub, saveContentToGitHub } from "./github-save";

export async function savePortfolioContent(data: PortfolioContent): Promise<{ savedAt: string }> {
  if (canSaveToGitHub()) {
    return saveContentToGitHub(data);
  }

  const res = await fetch("/api/content", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || "Could not save");
  }

  return res.json();
}

export function verifyAdminPin(pin: string): boolean {
  const expected = process.env.NEXT_PUBLIC_ADMIN_PIN || "8532";
  return pin === expected;
}
