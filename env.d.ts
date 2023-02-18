declare const requiredServerEnvs: readonly [
  "APP_URL",
  "SUPABASE_TOKEN",
  "SUPABASE_API_KEY"
];

type RequiredServerEnvKeys = typeof requiredServerEnvs[number];
declare global {
  namespace NodeJS {
    interface ProcessEnv extends Record<RequiredServerEnvKeys, string> {}
  }
}
export {};
