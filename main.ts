// One-Line Office Joke — make.fun entry
// Writes a single office joke line to entry.txt in the output directory.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const joke =
  "Our 'quick sync' is 45 minutes long, has no agenda, and always ends by scheduling another quick sync.";

// The bounty asks for one line of at most 200 characters, with no
// trailing newline, so refuse to emit anything that breaks that shape.
if (joke.length > 200 || joke.includes("\n") || joke.endsWith("\n")) {
  throw new Error(`joke must be a single line of at most 200 characters, got ${joke.length}`);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });

const target = join(outDir, "entry.txt");
writeFileSync(target, joke, "utf8");

const written = readFileSync(target, "utf8");
if (written !== joke) {
  throw new Error("entry.txt does not match the joke exactly");
}

console.log(`Wrote ${written.length} characters to ${target}`);
