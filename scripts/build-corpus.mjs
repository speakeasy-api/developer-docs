#!/usr/bin/env node
// Builds the docs-mcp corpus: copies the content hubs into dist/corpus,
// renaming .mdx to .md so the indexer's **/*.md glob picks them up.
// JSX and import statements are intentionally left in place.
import { copyFileSync, existsSync, mkdirSync, readdirSync, rmSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const corpusDir = path.join(repoRoot, "dist", "corpus");
const HUBS = ["docs", "guides", "api-design", "mcp", "openapi"];

rmSync(corpusDir, { recursive: true, force: true });
mkdirSync(corpusDir, { recursive: true });

let copied = 0;

function copyTree(srcDir, destDir) {
  for (const entry of readdirSync(srcDir, { withFileTypes: true })) {
    const src = path.join(srcDir, entry.name);
    if (entry.isDirectory()) {
      copyTree(src, path.join(destDir, entry.name));
      continue;
    }
    if (!entry.isFile()) continue;
    const ext = path.extname(entry.name);
    if (ext !== ".md" && ext !== ".mdx") continue;
    const destName = ext === ".mdx" ? `${entry.name.slice(0, -4)}.md` : entry.name;
    const dest = path.join(destDir, destName);
    if (existsSync(dest)) {
      console.error(`Corpus filename collision: ${dest}`);
      process.exit(1);
    }
    mkdirSync(destDir, { recursive: true });
    copyFileSync(src, dest);
    copied += 1;
  }
}

for (const hub of HUBS) {
  const hubDir = path.join(repoRoot, hub);
  if (!existsSync(hubDir)) {
    console.error(`Missing content hub: ${hub}`);
    process.exit(1);
  }
  copyTree(hubDir, path.join(corpusDir, hub));
}

copyFileSync(path.join(repoRoot, ".docs-mcp.json"), path.join(corpusDir, ".docs-mcp.json"));
console.log(`Corpus built: ${copied} markdown files in ${path.relative(repoRoot, corpusDir)}`);
