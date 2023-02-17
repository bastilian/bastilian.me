import "https://deno.land/std/dotenv/load.ts";

import { dirname, fromFileUrl, join } from "path";

// TODO this is horrid.

export const MASTODON_FEED = Deno.env.get("MASTODON_FEED");
export const PIXELFED_FEED = Deno.env.get("PIXELFED_FEED");

export const ENABLE_IMAGE_CACHE =
  (Deno.env.get("ENABLE_IMAGE_CACHE") || "false") === "true";
export const CACHE_STORAGE = Deno.env.get("CACHE_STORE") || "local";

export const IMAGE_CACHE_DIR = Deno.env.get("IMAGE_CACHE_DIR") ||
  join(dirname(fromFileUrl(import.meta.url)), ".image-cache");

export const S3_HOST = Deno.env.get("S3_HOST") || "http://localhost:9000";
export const S3_BUCKET = Deno.env.get("S3_BUCKET") || "dev-images";
export const S3_REGION = Deno.env.get("S3_REGION") || "dev-region";
export const S3_ACCESS_KEY = Deno.env.get("S3_ACCESS_KEY");
export const S3_SECRET_KEY = Deno.env.get("S3_SECRET_KEY");

export const SUPABASE = Deno.env.get("SUPABASE");
export const SUPABASE_KEY = Deno.env.get("SUPABASE_KEY");
