import { ensureDir } from "https://deno.land/std@0.177.0/fs/mod.ts";
import { join } from "path/mod.ts";
import {
  CACHE_STORAGE,
  ENABLE_IMAGE_CACHE,
  IMAGE_CACHE_DIR,
  S3_ACCESS_KEY,
  S3_BUCKET,
  S3_HOST,
  S3_REGION,
  S3_SECRET_KEY,
} from "../../_config.ts";
import { S3Client } from "https://deno.land/x/s3_lite_client@0.3.0/mod.ts";

// LOCAL STORAGE
const writeLocal = async (fileName, data) => {
  const filePath = join(IMAGE_CACHE_DIR, fileName);

  return await Deno.writeFile(filePath, data);
};

const readLocal = async (fileName) => {
  const filePath = join(IMAGE_CACHE_DIR, fileName);

  return await Deno.readFile(filePath);
};

const localFileStore = async () => {
  if (ENABLE_IMAGE_CACHE) {
    await ensureDir(IMAGE_CACHE_DIR);
  }
  return {
    readFile: readLocal,
    writeFile: writeLocal,
  };
};

// CACHE API STORAGE
const writeCache = (cacheStore) => async (fileName, data) => {
  return await cacheStore.put(
    new URL("http://" + fileName),
    new Response(data),
  );
};

const readCache = (cacheStore) => async (fileName) => {
  return (await cacheStore.match(new URL("http://" + fileName))).arrayBuffer();
};

const cacheApiStore = async () => {
  const cacheStore = await caches.open("images");

  return {
    readFile: readCache(cacheStore),
    writeFile: writeCache(cacheStore),
  };
};

// S3 STORAGE
const writeS3 = (s3client) => async (fileName, data) => {
  await s3client.putObject(fileName, data);
  return new Uint8Array(await (await s3client.getObject(fileName)).arrayBuffer());
};

const readS3 = (s3client) => async (fileName) => {
  const res = await s3client.getObject(fileName);
  return new Uint8Array(await res.arrayBuffer());
};

const s3Store = () => {
  const host = new URL(S3_HOST);
  const s3client = new S3Client({
    endPoint: host.hostname,
    useSSL: host.protocol === "https:",
    bucket: S3_BUCKET,
    accessKey: S3_ACCESS_KEY,
    secretKey: S3_SECRET_KEY,
    region: S3_REGION,
  });

  return {
    readFile: readS3(s3client),
    writeFile: writeS3(s3client),
  };
};

export default async () => {
  return await {
    "local": localFileStore,
    "cache": cacheApiStore,
    "s3": s3Store,
  }[CACHE_STORAGE]();
};
