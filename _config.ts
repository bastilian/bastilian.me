import "dotenv:load";
import { dirname, fromFileUrl, join } from "path";
import {
  collectFeeds,
  getCacheDefaults,
  getStorage,
} from "./utilities/configHelpers.ts";
import { log } from './utilities/helpers.ts';

const appRoot = dirname(fromFileUrl(Deno.mainModule || import.meta.url));

export default (() => {
  const storage = getStorage(appRoot);
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
    imageprocessor: Deno.env.get("IMAGE_PROCESSOR") || "is", // "is", "im"
    staticDirectory: join(
      appRoot,
      "static",
    ),
    ...feeds,
    ...storage,
    ...getCacheDefaults(storage),
  };

  if(Deno.env.get("DEBUG")) {
    console.log("Full application configuration:", fullConfig);
  }

  return fullConfig;
})();
