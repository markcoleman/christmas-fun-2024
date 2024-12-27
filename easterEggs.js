// easterEggs.js
import chalk from 'chalk';
import { logWithDelay } from './logWithDelay.js';

// Easter Egg #1: RUN_EASTER_EGG
export async function runEasterEgg() {
  if (process.env.RUN_EASTER_EGG) {
    await logWithDelay(chalk.bgMagenta("🔎 Easter Egg #1 found: RUN_EASTER_EGG variable is set!"), 0);
    await logWithDelay(chalk.magenta("The code fairies grant you extra GitHub contributions today!\n"), 0);
  }
}

// Easter Egg #2: Santa chance
export async function maybeShowSanta(santaClausArt) {
  if (Math.random() < 0.3) {
    await logWithDelay(chalk.red("🎅 Santa spotted!"), 0);
    await logWithDelay(santaClausArt, 0);
  }
}

// Easter Egg #3: ONCALL
export async function onCallEasterEgg() {
  if (process.env.ONCALL === "true") {
    await logWithDelay(chalk.red("🔔 Easter Egg #3: You are on-call tonight!"), 0);
    await logWithDelay(chalk.red("Better keep one eye on your pager, just in case of an alert.\n"), 0);
  }
}

// Easter Egg #4: Rare debug log
export async function debugEasterEgg() {
  if (Math.random() < 0.1) {
    await logWithDelay(chalk.bgBlack.white("\n*** Debug Log: Santa has spontaneously triggered a hotfix ***\n"), 0);
  }
}