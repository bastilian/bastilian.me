import "https://deno.land/x/dotenv/load.ts";

import * as path from "https://deno.land/std@0.177.0/path/mod.ts";

const __dirname = path.dirname(path.fromFileUrl(import.meta.url));

export const MASTODON_FEED = "https://mastodon.social/users/bastilian.rss";
export const PIXELFED_FEED = "https://pixey.org/users/bastilian.atom";

export const IMAGE_CACHE_DIR = path.join(__dirname, ".image-cache");
export const ENABLE_IMAGE_CACHE =
  (Deno.env.get("ENABLE_IMAGE_CACHE") || "false") === "true";
export const CACHE_STORAGE = Deno.env.get("CACHE_STORE") || "local"; // "cache"
export const S3_HOST = Deno.env.get("S3_HOST") || "http://localhost:9000";
export const S3_BUCKET = Deno.env.get("S3_BUCKET") || "images";
export const S3_REGION = Deno.env.get("S3_REGION") || "dev-region";
export const S3_ACCESS_KEY = Deno.env.get("S3_ACCESS_KEY");
export const S3_SECRET_KEY = Deno.env.get("S3_SECRET_KEY");
