// index.js
import { fileURLToPath } from 'url';

// If you're using Chalk v5+, remember you need to have "type": "module" in your package.json
import chalk from 'chalk';

const __filename = fileURLToPath(import.meta.url);

// --------------- Festive ASCII Art Definitions ---------------
const christmasTree = `
         ${chalk.yellowBright("★")}
        ${chalk.greenBright("oOo")}
       ${chalk.greenBright("oOoOo")}
      ${chalk.greenBright("oOoOoOo")}
        ${chalk.greenBright("oOo")}
        ${chalk.greenBright("oOo")}
     ~ ${chalk.blueBright("SOFTWARE")} ~
       ${chalk.magentaBright("ENGINEER")}
`;

const santaClaus = `
        ${chalk.bgRed.white("Ho Ho Ho!")}
           ${chalk.white("_____")}
         ${chalk.red("<(")} ${chalk.white("^ ^")} ${chalk.red(")>")}
           ${chalk.white("-----")}
          ${chalk.red("<(")}     ${chalk.red(")>")}
            ${chalk.white("| | |")}
          ${chalk.red("==")}[${chalk.white("___")}]==
`;

// --------------- Helper Function ---------------
function logWithDelay(message, delay = 500) {
  if(__filename !== process.argv[1]){
    delay = 0;
  }
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(message);
      resolve();
    }, delay);
  });
}

// --------------- Main Script ---------------
export async function main() {
  console.clear();

  // Easter Egg #1: RUN_EASTER_EGG
  if (process.env.RUN_EASTER_EGG) {
    await logWithDelay(chalk.bgMagenta("🔎 Easter Egg #1 found: RUN_EASTER_EGG variable is set!"),0);
    await logWithDelay(chalk.magenta("The code fairies grant you extra GitHub contributions today!\n"),0);
  }

  // Intro ASCII Art in color
  await logWithDelay(christmasTree,0);

  // Start the story
  await logWithDelay(chalk.cyan("Once upon a time, in a codebase far, far away...\n"), 1000);
  await logWithDelay(chalk.cyan("It was the night before Christmas, and all through the repo..."), 1000);
  await logWithDelay(chalk.cyan("Not a single pipeline was failing—not even a flake or two.\n"), 1500);

  // Easter Egg #2: Randomly mention Santa
  if (Math.random() < 0.3) {
    await logWithDelay(chalk.red("🎅 Santa spotted!"),0);
    await logWithDelay(santaClaus,0);
  }

  await logWithDelay(chalk.green("Pull requests were hung by the pipeline with care,"), 1000);
  await logWithDelay(chalk.green("In hopes that the CI/CD soon would be there."), 1500);

  await logWithDelay(chalk.green("The engineers were nestled all snug at their desks,"), 1000);
  await logWithDelay(chalk.green("While visions of merged branches danced in their heads.\n"), 1500);

  // Easter Egg #3: ONCALL
  if (process.env.ONCALL === "true") {
    await logWithDelay(chalk.red("🔔 Easter Egg #3: You are on-call tonight!"),0);
    await logWithDelay(chalk.red("Better keep one eye on your pager, just in case of an alert.\n"),0);
  }

  await logWithDelay(chalk.green("With code reviews done and commit messages read,"), 1000);
  await logWithDelay(chalk.green("They took a quick nap, ignoring the dreaded 'Needs Rebase' thread."), 1500);

  await logWithDelay(chalk.yellow("When out on the Slack channel there arose such a clatter,"), 1000);
  await logWithDelay(chalk.yellow("I sprang from my spinny chair to see what was the matter."), 1500);

  // Easter Egg #4: Debug log that rarely shows (10% chance)
  if (Math.random() < 0.1) {
    await logWithDelay(chalk.bgBlack.white("\n*** Debug Log: Santa has spontaneously triggered a hotfix ***\n"),0);
  }

  await logWithDelay(chalk.yellow("Away to the console I flew like a flash,"), 1000);
  await logWithDelay(chalk.yellow("Tore open the logs, hoping the server didn't crash."), 1500);

  await logWithDelay(chalk.blue("The moon on the bytes of the new-pushed code,"), 1000);
  await logWithDelay(chalk.blue("Gave the luster of midnight releases about to explode.\n"), 1500);

  await logWithDelay(chalk.blue("When, what to my wondering eyes should appear,"), 1000);
  await logWithDelay(chalk.blue("But a miniature release note, and eight fresh unit tests, oh dear!"), 1500);

  await logWithDelay(chalk.blue("With a little old driver, so agile and quick,"), 1000);
  await logWithDelay(chalk.blue("I knew in a moment it must be St. Nick— Wait, that’s not quite right...\n"), 1500);

  await logWithDelay(chalk.magenta("Actually, it was just Jenkins, wearing a Santa hat!"), 1000);
  await logWithDelay(chalk.magenta("He whistled, and shouted, “All jobs are green, how about that!”"), 1500);

  await logWithDelay(chalk.magenta("He ran all the lints, to his team gave a wave,"), 1000);
  await logWithDelay(chalk.magenta("Deploying fresh code from GitHub to live.\n"), 1500);

  // Additional ASCII flair
  await logWithDelay(`\n${chalk.red("-".repeat(40))}\n`, 0);
  await logWithDelay(chalk.bold("Happy Holidays from your friendly dev environment!"),0);
  await logWithDelay(chalk.bold("May your commits be clean and your builds be serene!"),0);
  await logWithDelay(`\n${chalk.red("-".repeat(40))}\n`,0);

  // Easter Egg #5: CODE_COVERAGE
  const coverage = process.env.CODE_COVERAGE || "92.3%";
  await logWithDelay(
    chalk.greenBright(
      `PS: Santa says code coverage is at ${coverage}... so you’ve been *mostly* good this year!\n`
    )
  ,0);

  await logWithDelay(chalk.cyanBright("~ End of our unusual tale ~\n"), 1000);

  // Farewell ASCII
  await logWithDelay(chalk.whiteBright("** 🎄 Merry Christmas & Happy Coding! 🎄 **"),0);
}

// If running directly from the command line (instead of importing in a test):
if (__filename === process.argv[1]) {
  main().catch((err) => {
    console.error(chalk.red("An error occurred:", err));
  });
}
