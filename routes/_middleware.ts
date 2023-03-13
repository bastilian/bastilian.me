import config from "../_config.ts";
import { createClient } from "supabase";

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

  return ctx.next();
};
