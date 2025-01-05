// index.js
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import chalk from "chalk";

import { christmasTree, santaClaus } from "./asciiArt.js";
import { logWithDelay } from "./logWithDelay.js";
import {
  runEasterEgg,
  maybeShowSanta,
  onCallEasterEgg,
  debugEasterEgg,
  codeCoverage,
} from "./easterEggs.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load the story lines from story.json
const storyPath = path.join(__dirname, "story.json");
const storyData = JSON.parse(fs.readFileSync(storyPath, "utf-8"));

// Map color strings to chalk functions or fallback to white
const colorMap = {
  cyan: chalk.cyan,
  green: chalk.green,
  yellow: chalk.yellow,
  blue: chalk.blue,
  magenta: chalk.magenta,
  red: chalk.red,
  bold: chalk.bold,
  greenBright: chalk.greenBright,
  cyanBright: chalk.cyanBright,
  whiteBright: chalk.whiteBright,
  // ...
};

export async function main() {
  console.clear();

  // Easter Egg #1
  await runEasterEgg();

  // Intro ASCII Art
  await logWithDelay(christmasTree, 0);

  // Easter Egg #2: Santa
  await maybeShowSanta(santaClaus);

  // Easter Egg #3: ONCALL
  await onCallEasterEgg();

  // Easter Egg #4: Rare debug
  await debugEasterEgg();

  // Now loop through the story from story.json
  for (const { text, color, delay } of storyData) {
    const colorFn = colorMap[color] || chalk.white;
    await logWithDelay(colorFn(text), delay);
  }

  // Easter Egg #5: CODE_COVERAGE
  await codeCoverage();
}

// If running directly from CLI
if (__filename === process.argv[1]) {
  main().catch((err) => {
    console.error(chalk.red("An error occurred:", err));
  });
}
