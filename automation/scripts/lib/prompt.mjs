import readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function waitForEnter(message, fallbackMs = 120000) {
  console.log(message);
  const waitMs = Number(process.env.AUTOMATION_WAIT_MS || fallbackMs);

  if (!input.isTTY || process.env.AUTOMATION_NONINTERACTIVE === "1") {
    console.log(`Non-interactive session detected. Waiting ${Math.round(waitMs / 1000)} seconds for manual browser actions.`);
    await sleep(waitMs);
    return;
  }

  const rl = readline.createInterface({ input, output });
  await rl.question("Press Enter to continue... ");
  rl.close();
}
