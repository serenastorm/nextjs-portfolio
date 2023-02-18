declare const requiredServerEnvs: readonly [
  "CF_SPACE",
  "CF_PUBLISHED_CONTENT_ACCESS_TOKEN",
  "CF_DRAFT_CONTENT_ACCESS_TOKEN",
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
