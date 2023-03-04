declare const requiredServerEnvs: readonly [
  "APP_URL",
  "SUPABASE_TOKEN",
  "SUPABASE_API_KEY",
  "PORTFOLIO_PASSWORD",
  "PORTFOLIO_URL"
];

type RequiredServerEnvKeys = typeof requiredServerEnvs[number];
declare global {
  namespace NodeJS {
    interface ProcessEnv extends Record<RequiredServerEnvKeys, string> {}
  }
}
export {};
