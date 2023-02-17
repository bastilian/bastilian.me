import { SUPABASE, SUPABASE_KEY } from "../_config.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const supabaseClient = () => {
  if (SUPABASE && SUPABASE_KEY) {
    return createClient(
      SUPABASE,
      SUPABASE_KEY,
    );
  }
};

export const handler = (req, ctx) => {
  const supabase = supabaseClient();

  ctx.state = {
    ...ctx.state,
    supabase,
  };
  return ctx.next();
};
