import { createClient } from "@supabase/supabase-js";
import type { Database } from "lib/supabase/database.types";

export const supabaseClient = createClient<Database>(
  "https://nwqrxrnezozdnwkirsxd.supabase.co",
  process.env.SUPABASE_API_KEY
);
