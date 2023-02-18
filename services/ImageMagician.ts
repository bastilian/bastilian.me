import { join } from "path";

import config from "../_config.ts";
import { log } from "../utilities/helpers.ts";
import { optionsFromParams } from "./ImageMagician/helpers.ts";
import imageMagic from "./ImageMagician/imageMagic.ts";
import storage from "./Storage.ts";

const store = await storage();

const cacheImage = async (image, targetFilePath) => {
  if (config.cache.images) {
    log("Caching image:", targetFilePath);
    return await store.writeFile(targetFilePath, image);
  } else {
    return await image;
  }
};

const fetchRemoteImage = async (url) => {
  const sourceRes = await fetch(url);
  if (!sourceRes.ok) {
    throw new Error("Error retrieving image from URL.");
  }
  return new Uint8Array(await sourceRes.arrayBuffer());
};

const getAndCacheImage = async (filePath, url) => {
  if (url.match(/^http[s]?\:/)?.length > 0) {
    log("Fetching image from ", url);
    const image = await fetchRemoteImage(url);
    return await cacheImage(image, filePath);
  } else {
    const imagePath = join(config.staticDirectory, url);
    log("Reading image from ", imagePath);
    const image = await Deno.readFile(imagePath);
    return await cacheImage(image, filePath);
  }
};

const chachedOrFetchedImage = async (filePath, url) => {
  try {
    log("Trying to read cached original image:", filePath);
    return await store.readFile(filePath);
  } catch {
    log("Getting image fresh:", url);
    return await getAndCacheImage(filePath, url);
  }
};

const transformedImage = async (
  { filePath, url, transforms, targetFilePath },
) => {
  try {
    log("Trying to read from store:", targetFilePath);
    return await store.readFile(targetFilePath);
  } catch {
    log("Transforming image fresh.");
    return await cacheImage(
      await imageMagic(await chachedOrFetchedImage(filePath, url), transforms),
      targetFilePath,
    );
  }
};

export const transformImageFromUrlParams = async (params, host) => {
  log("Image Params:", params);
  const options = await optionsFromParams(params, host);
  log("Image Options:", options);
  const image = await transformedImage(options);

  return { image, mediaType: "image/png" };
};
