import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { main } from "../index.js"; // or "../index.ts" if needed

describe("Night Before Christmas Script", () => {
  let logSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    // Clear environment vars
    delete process.env.RUN_EASTER_EGG;
    delete process.env.ONCALL;
    delete process.env.CODE_COVERAGE;

    // Mock console.log
    logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
  });

  afterEach(() => {
    // Restore original console.log
    logSpy.mockRestore();
  });

  it("prints the final Merry Christmas message before the test ends", async () => {
    await main();
    const allLogs = logSpy.mock.calls.flatMap((call) => call).join("\n");
    expect(allLogs).toContain("** 🎄 Merry Christmas & Happy Coding! 🎄 **");
  });

  it("logs Easter Egg #1 lines if RUN_EASTER_EGG is set", async () => {
    process.env.RUN_EASTER_EGG = "true";

    await main();

    const allLogs = logSpy.mock.calls.flatMap((call) => call).join("\n");
    expect(allLogs).toContain(
      "🔎 Easter Egg #1 found: RUN_EASTER_EGG variable is set!",
    );
    expect(allLogs).toContain(
      "The code fairies grant you extra GitHub contributions today!",
    );
  });

  it('logs on-call lines if ONCALL === "true"', async () => {
    process.env.ONCALL = "true";

    await main();

    const allLogs = logSpy.mock.calls.flatMap((call) => call).join("\n");
    expect(allLogs).toContain("🔔 Easter Egg #3: You are on-call tonight!");
    expect(allLogs).toContain(
      "Better keep one eye on your pager, just in case of an alert.",
    );
  });

  it('does NOT log on-call lines if ONCALL is not "true"', async () => {
    await main();

    const allLogs = logSpy.mock.calls.flatMap((call) => call).join("\n");
    expect(allLogs).not.toContain("🔔 Easter Egg #3: You are on-call tonight!");
    expect(allLogs).not.toContain(
      "Better keep one eye on your pager, just in case of an alert.",
    );
  });

  it("prints the debug log if Math.random() < 0.1", async () => {
    // Force Math.random to be under 0.1
    vi.spyOn(Math, "random").mockReturnValue(0.05);

    await main();

    const allLogs = logSpy.mock.calls.flatMap((call) => call).join("\n");
    expect(allLogs).toContain(
      "*** Debug Log: Santa has spontaneously triggered a hotfix ***",
    );
  });

  it("does NOT print the debug log if Math.random() >= 0.1", async () => {
    vi.spyOn(Math, "random").mockReturnValue(0.5);

    await main();

    const allLogs = logSpy.mock.calls.flatMap((call) => call).join("\n");
    expect(allLogs).not.toContain(
      "*** Debug Log: Santa has spontaneously triggered a hotfix ***",
    );
  });

  it("uses the default 92.3% when CODE_COVERAGE is not set", async () => {
    await main();

    const allLogs = logSpy.mock.calls.flatMap((call) => call).join("\n");
    expect(allLogs).toContain("PS: Santa says code coverage is at 92.3%");
  });

  it("uses the provided value when CODE_COVERAGE is set", async () => {
    process.env.CODE_COVERAGE = "100%";

    await main();

    const allLogs = logSpy.mock.calls.flatMap((call) => call).join("\n");
    expect(allLogs).toContain("PS: Santa says code coverage is at 100%");
  });
});
