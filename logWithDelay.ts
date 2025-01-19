export function logWithDelay(message: string, delay = 500): Promise<void> {
  // if under Vitest (or Jest) skip or reduce the delay
  const skipDelay = process.env.VITEST || process.env.JEST_WORKER_ID;
  const actualDelay = skipDelay ? 0 : delay;

  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(message);
      resolve();
    }, actualDelay);
  });
}
