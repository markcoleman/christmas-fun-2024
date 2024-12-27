import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);

export function logWithDelay(message, delay = 500, skipDelay = false) {
    skipDelay = !!process.env.JEST_WORKER_ID;
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(message);
        resolve();
      }, skipDelay ? 0 : delay);
    });
  }