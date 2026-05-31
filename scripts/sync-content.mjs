import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const source = path.join(root, "data", "resume.json");
const targetDir = path.join(root, "public", "data");
const target = path.join(targetDir, "resume.json");

fs.mkdirSync(targetDir, { recursive: true });
fs.copyFileSync(source, target);
console.log("Synced data/resume.json → public/data/resume.json");
