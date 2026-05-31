import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const apiPath = path.join(root, "src", "app", "api");
const backupPath = path.join(root, "src", "app", "_api_pages_backup");

function moveApiRoutesOut() {
  if (fs.existsSync(apiPath)) {
    fs.rmSync(backupPath, { recursive: true, force: true });
    fs.renameSync(apiPath, backupPath);
  }
}

function restoreApiRoutes() {
  if (fs.existsSync(backupPath)) {
    fs.rmSync(apiPath, { recursive: true, force: true });
    fs.renameSync(backupPath, apiPath);
  }
}

moveApiRoutesOut();

try {
  execSync("next build", {
    stdio: "inherit",
    cwd: root,
    env: { ...process.env, GITHUB_PAGES: "true" },
  });
} finally {
  restoreApiRoutes();
}
