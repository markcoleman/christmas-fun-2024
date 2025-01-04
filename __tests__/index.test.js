// __tests__/index.test.js
import {
  jest,
  describe,
  it,
  expect,
  beforeEach,
  afterEach,
} from "@jest/globals";
import { main } from "../index.js";

describe("Night Before Christmas Script", () => {
  let logSpy;

  beforeEach(() => {
    delete process.env.RUN_EASTER_EGG;
    delete process.env.ONCALL;
    delete process.env.CODE_COVERAGE;
    logSpy = jest.spyOn(console, "log").mockImplementation(() => {});
  });

  afterEach(() => {
    logSpy.mockRestore();
  });

  it("prints the final Merry Christmas message before the test ends", async () => {
    await main();
    const allLogs = logSpy.mock.calls.flatMap((call) => call).join("\n");
    expect(allLogs).toContain("** 🎄 Merry Christmas & Happy Coding! 🎄 **");
  });

  it("logs Easter Egg #1 lines if RUN_EASTER_EGG is set", async () => {
    // Set the environment variable to trigger the Easter Egg
    process.env.RUN_EASTER_EGG = "true";

    // Call your main function (or whichever function invokes the Easter Egg code)
    await main();

    // Gather all the console.log output into a single string
    const allLogs = logSpy.mock.calls
      .flatMap((call) => call) // flatten each call array
      .join("\n"); // join everything into one big string

    // Verify the lines you expect are present
    expect(allLogs).toContain(
      "🔎 Easter Egg #1 found: RUN_EASTER_EGG variable is set!",
    );
    expect(allLogs).toContain(
      "The code fairies grant you extra GitHub contributions today!",
    );
  });
  it('logs on-call lines if ONCALL === "true"', async () => {
    // Set ONCALL to true for this test
    process.env.ONCALL = "true";

    await main(); // If main() is async, be sure to await it

    // Gather all the console.log output
    const allLogs = logSpy.mock.calls.flatMap((call) => call).join("\n");

    // Check that the Easter Egg #3 lines are present
    expect(allLogs).toContain("🔔 Easter Egg #3: You are on-call tonight!");
    expect(allLogs).toContain(
      "Better keep one eye on your pager, just in case of an alert.",
    );
  });

  it('does NOT log on-call lines if ONCALL is not "true"', async () => {
    // Don't set ONCALL at all for this test
    await main();

    const allLogs = logSpy.mock.calls.flatMap((call) => call).join("\n");

    // Verify that the lines for Easter Egg #3 are NOT present
    expect(allLogs).not.toContain("🔔 Easter Egg #3: You are on-call tonight!");
    expect(allLogs).not.toContain(
      "Better keep one eye on your pager, just in case of an alert.",
    );
  });
  it("prints the debug log if Math.random() < 0.1", async () => {
    // Force Math.random to return 0.05 => triggers the Easter egg
    jest.spyOn(Math, "random").mockReturnValue(0.05);

    await main(); // run your function containing the if (Math.random() < 0.1) check

    // Gather all logs
    const allLogs = logSpy.mock.calls.flatMap((call) => call).join("\n");

    // Verify the debug log is present
    expect(allLogs).toContain(
      "*** Debug Log: Santa has spontaneously triggered a hotfix ***",
    );
  });

  it("does NOT print the debug log if Math.random() >= 0.1", async () => {
    // Force Math.random to return 0.5 => does NOT trigger the Easter egg
    jest.spyOn(Math, "random").mockReturnValue(0.5);

    await main();

    const allLogs = logSpy.mock.calls.flatMap((call) => call).join("\n");

    // Verify the debug log is absent
    expect(allLogs).not.toContain(
      "*** Debug Log: Santa has spontaneously triggered a hotfix ***",
    );
  });
  it("uses the default 92.3% when CODE_COVERAGE is not set", async () => {
    // CODE_COVERAGE is not set here

    await main(); // Run your main function that prints coverage

    // Gather all logged messages into a single string
    const allLogs = logSpy.mock.calls.flatMap((call) => call).join("\n");

    // Check for the default coverage message
    expect(allLogs).toContain("PS: Santa says code coverage is at 92.3%");
  });

  it("uses the provided value when CODE_COVERAGE is set", async () => {
    process.env.CODE_COVERAGE = "100%";

    await main();

    const allLogs = logSpy.mock.calls.flatMap((call) => call).join("\n");

    // Check for the custom coverage message
    expect(allLogs).toContain("PS: Santa says code coverage is at 100%");
  });
});
