import "dotenv:load";
import { dirname, fromFileUrl, join } from "path";

const getStorage = () => {
  if (Deno.env.get("LOCAL_STORAGE_DIR")) {
    return {
      local: {
        directory: join(
          dirname(fromFileUrl(import.meta.url)),
          Deno.env.get("LOCAL_STORAGE_DIR") || "storage",
        ),
      },
    };
  }

  if (Deno.env.get("S3_HOST")) {
    return {
      s3: {
        host: Deno.env.get("S3_HOST") || "http://localhost:9000",
        bucket: Deno.env.get("S3_BUCKET") || "dev-images",
        region: Deno.env.get("S3_REGION") || "dev-region",
        accessKey: Deno.env.get("S3_ACCESS_KEY"),
        secretKey: Deno.env.get("S3_SECRET_KEY"),
      },
    };
  }

  if (Deno.env.get("CACHE_STORE")) {
    return {
      cache: {
        namespace: "cacheStore",
      },
    };
  }

  return {};
};

export default {
  debug: Deno.env.get("DEBUG"),
  supabase: {
    url: Deno.env.get("SUPABASE"),
    key: Deno.env.get("SUPABASE_KEY"),
  },
  feeds: {
    mastodon: Deno.env.get("MASTODON_FEED"),
    pixelfed: Deno.env.get("PIXELFED_FEED"),
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
