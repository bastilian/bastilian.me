import "dotenv:load";
import { dirname, fromFileUrl, join } from "path";
import {
  collectFeeds,
  getCacheDefaults,
  getStorage,
} from "./utilities/configHelpers.ts";

export default (() => {
  const storage = getStorage();
  const feeds = collectFeeds();

  const fullConfig = {
    debug: Deno.env.get("DEBUG"),
    accounts: {
      supabase: {
        url: Deno.env.get("SUPABASE"),
        key: Deno.env.get("SUPABASE_KEY"),
      },
      // lastFMApi: {
      //   appKey: Deno.env.get("LASTFM_KEY"),
      //   appSecret: Deno.env.get("LASTFM_SECRET"),
      // },
    },
    imageprocessor: Deno.env.get("IMAGE_PROCESSOR") || "is",
    staticDirectory: join(
      dirname(fromFileUrl(Deno.mainModule)),
      "static",
    ),
    ...feeds,
    ...storage,
    ...getCacheDefaults(storage),
  };

  console.log("Full application configuration:", fullConfig);

  return fullConfig;
})();
