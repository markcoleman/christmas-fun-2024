// index.ts
import chalk from "chalk";
/**
 * This import works if `resolveJsonModule` is true in your tsconfig,
 * and your environment supports importing JSON.
 */
import storyJson from "./story.json" with { type: "json" };

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
 * Then cast or assert your imported JSON to that shape:
 */
const storyData = storyJson as StoryLine[];

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
