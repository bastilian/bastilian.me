import { dirname, fromFileUrl, join } from "@std/path";

export const getStorage = (appRoot: string) => ({
  storage: {
    ...Deno.env.get("LOCAL_STORAGE_DIR")
      ? {
        local: {
          directory: Deno.env.get("LOCAL_STORAGE_DIR") || join(
            appRoot,
            "storage",
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

    ...Deno.env.get("KV_STORE")
      ? {
        kv: ["true", "false"].includes(Deno.env.get("KV_STORE") as string)
          ? Deno.env.get("KV_STORE") === "true"
          : Deno.env.get("KV_STORE"),
      }
      : {},
  },
});

export const getCacheDefaults = (storage: any) => {
  const storageAvailable = Object.keys(storage.storage).length > 0;

  return {
    cache: storageAvailable
      ? {
        images: Deno.env.get("CACHE_IMAGES") &&
            Deno.env.get("CACHE_IMAGES") === "true" || true,
        feeds: Deno.env.get("CACHE_FEEDS") &&
            Deno.env.get("CACHE_FEEDS") === "true" || true,
        openGraph: Deno.env.get("CACHE_OPENGRAPH") &&
            Deno.env.get("CACHE_OPENGRAPH") === "true" || true,
      }
      : undefined,
  };
};

export const collectFeeds = () => {
  const envObj = Object.entries(Deno.env.toObject());
  const feedEnvVars = envObj.filter(([key]) => {
    return key.endsWith("_FEED");
  });

  return {
    feeds: feedEnvVars.reduce((feeds, [key, value]) => ({
      ...feeds,
      [key.split("_")[0].toLowerCase()]: value,
    }), {}),
  };
};

export const getDebug = () => {
  const enableDebug = Deno.env.get("DEBUG");
  console.log(Deno.env.get("DEBUG"));
  if (
    typeof enableDebug === "string" &&
    enableDebug !== "true"
  ) {
    return enableDebug.split(",");
  } else {
    return enableDebug === "true";
  }
};
