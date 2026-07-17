// project-tree.js

import fs from "node:fs";
import path from "node:path";

const ROOT = process.argv[2] || process.cwd();
const OUTPUT = process.argv[3] || "project-structure.md";

const IGNORE = new Set([
  "node_modules",
  ".git",
  ".next",
  "dist",
  "build",
  "coverage",
  ".turbo",
  ".vercel",
  ".idea",
  ".vscode",
  ".DS_Store",
]);

function walk(dir, prefix = "") {
  const entries = fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((e) => !IGNORE.has(e.name))
    .sort((a, b) => {
      if (a.isDirectory() !== b.isDirectory()) {
        return a.isDirectory() ? -1 : 1;
      }
      return a.name.localeCompare(b.name);
    });

  let output = "";

  entries.forEach((entry, index) => {
    const last = index === entries.length - 1;
    const connector = last ? "└── " : "├── ";

    output += `${prefix}${connector}${entry.name}\n`;

    if (entry.isDirectory()) {
      output += walk(
        path.join(dir, entry.name),
        prefix + (last ? "    " : "│   "),
      );
    }
  });

  return output;
}

const tree = `# Project Structure

Root: ${path.resolve(ROOT)}

\`\`\`
${path.basename(ROOT)}
${walk(ROOT)}
\`\`\`
`;

fs.writeFileSync(OUTPUT, tree);

console.log(`✅ Wrote ${OUTPUT}`);
