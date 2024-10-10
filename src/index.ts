import spawn from "cross-spawn";
import dotenv from "dotenv";

const setSecret = async ({
  key,
  value,
  config,
  environment,
}: {
  key: string;
  value: string;
  config?: string;
  environment?: string;
}) => {
  return new Promise<void>((resolve, reject) => {
    const c = config ? ["-c", config] : [];
    const e = environment ? ["--env", environment] : [];
    const p = spawn("wrangler", ["secret", "put", ...c, ...e, key], {
      stdio: "pipe",
    });
    p.stdout?.pipe(process.stdout);
    if (!p.stdin) throw new Error("stdin is null");
    p.stdin.write(value);
    p.stdin.end();
    p.on("close", (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject();
      }
    });
  });
};

export const deploySecrets = async ({
  envPath,
  config,
  environment,
}: {
  envPath: string;
  config?: string;
  environment?: string;
}) => {
  const env = dotenv.config({
    path: envPath,
  }).parsed;
  if (!env) throw new Error("Cannot read env file");
  for (const [key, value] of Object.entries(env)) {
    await setSecret({ key, value, config, environment });
  }
};

const main = async () => {};

main();
