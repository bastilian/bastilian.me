import config from "../_config.ts";
import { createClient } from "supabase";

const supabaseClient = () => {
  if (config.supabase?.url && config.supabase?.key) {
    return createClient(
      config.supabase.url,
      config.supabase.key,
    );
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
