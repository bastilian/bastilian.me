import "dotenv:load";
import { dirname, fromFileUrl, join } from "path";

const getStorage = () => ({
  ...Deno.env.get("LOCAL_STORAGE_DIR")
    ? {
      local: {
        directory: join(
          dirname(fromFileUrl(import.meta.url)),
          Deno.env.get("LOCAL_STORAGE_DIR") || "storage",
        ),
      },
    }
    : {},

  ...Deno.env.get("S3_HOST")
    ? {
      s3: {
        host: Deno.env.get("S3_HOST") || "http://localhost:9000",
        bucket: Deno.env.get("S3_BUCKET") || "dev-images",
        region: Deno.env.get("S3_REGION") || "dev-region",
        accessKey: Deno.env.get("S3_ACCESS_KEY"),
        secretKey: Deno.env.get("S3_SECRET_KEY"),
      },
    }
    : {},

  ...Deno.env.get("CACHE_STORE")
    ? {
      cache: {
        namespace: "cacheStore",
      },
    }
    : {},
});

export default {
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

  feeds: {
    mastodon: Deno.env.get("MASTODON_FEED"),
    pixelfed: Deno.env.get("PIXELFED_FEED"),
    lastfm: Deno.env.get("LASTFM_FEED"),
  },

  imageprocessor: Deno.env.get("IMAGE_PROCESSOR") || "is",
  storage: {
    ...getStorage(),
  },

  staticDirectory: join(
    dirname(fromFileUrl(import.meta.url)),
    "static",
  ),
  cache: {
    images: Deno.env.get("CACHE_IMAGES") &&
        Deno.env.get("CACHE_IMAGES") === "true" || true,
    feeds: Deno.env.get("CACHE_FEEDS") &&
        Deno.env.get("CACHE_FEEDS") === "true" || true,
  },
};
