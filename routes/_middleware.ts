import config from "../_config.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

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
