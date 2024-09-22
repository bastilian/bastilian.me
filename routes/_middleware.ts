import config from "../_config.ts";
import { createClient } from "@supabase/supabase-js";

const supabaseClient = () => {
  const { url, key } = config.accounts.supabase;
  if (url && key) {
    return createClient(url, key);
  }
};

export const handler = (_, ctx) => {
  const supabaseClientInstance = supabaseClient();

  ctx.state = {
    ...ctx.state,
    ...supabaseClientInstance ? { supabase: supabaseClientInstance } : {},
  };
  ctx.appConfig = config;

  return ctx.next();
};
