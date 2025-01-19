// index.ts
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import chalk from "chalk";
/**
 * This import works if `resolveJsonModule` is true in your tsconfig,
 * and your environment supports importing JSON.
 */

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Or pass a param to main, or read from config. Then build the file name:
const userLang = process.env.LANGUAGE || "en";
const storyPath = path.join(__dirname, `story.${userLang}.json`);

// We'll define an English fallback path
const englishFallbackPath = path.join(__dirname, "story.en.json");

let storyData: StoryLine[] = [];

// Try user-chosen language first
try {
  const raw = fs.readFileSync(storyPath, "utf-8");
  storyData = JSON.parse(raw) as StoryLine[];
  console.log(chalk.cyan(`Loaded story for language: ${userLang}`));
} catch (err) {
  console.error(
    chalk.red(
      `Could not load story for language '${userLang}'. Falling back to English.`,
    ),
  );

  // Attempt English fallback
  try {
    const rawFallback = fs.readFileSync(englishFallbackPath, "utf-8");
    storyData = JSON.parse(rawFallback) as StoryLine[];
    console.log(chalk.yellow("Loaded English fallback story."));
  } catch (err2) {
    console.error(
      chalk.red("Failed to load the English fallback story. Exiting."),
      err2,
    );
    process.exit(1);
  }
}

import { christmasTree, santaClaus } from "./asciiArt.js";
import { logWithDelay } from "./logWithDelay.js";
import {
  runEasterEgg,
  maybeShowSanta,
  onCallEasterEgg,
  debugEasterEgg,
  codeCoverage,
} from "./easterEggs.js";

/**
 * If you want typed access to the JSON,
 * define an interface for each line.
 */
interface StoryLine {
  text: string;
  color: string;
  delay: number;
}

/**
 * Map color strings to Chalk functions (or fallback to chalk.white)
 */
type ChalkFunction = (text: string) => string;

const colorMap: Record<string, ChalkFunction> = {
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
};

/**
 * Main function to run the story
 */
export async function main(): Promise<void> {
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

  // Now loop through the story lines
  for (const { text, color, delay } of storyData) {
    const colorFn = colorMap[color] || chalk.white;
    await logWithDelay(colorFn(text), delay);
  }

  // Easter Egg #5: CODE_COVERAGE
  await codeCoverage();
}

/**
 * If this file is run directly via the command line (Node ESM),
 * we call main().
 * In ESM, we compare import.meta.url to process.argv[1],
 * or you can replicate the logic with fileURLToPath if desired.
 */
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch((err) => {
    console.error(chalk.red("An error occurred:", err));
  });
}
