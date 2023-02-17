import { log } from "../utilities/helpers.ts";

import { ENABLE_IMAGE_CACHE } from "../_config.ts";
import { optionsFromParams } from "./ImageMagician/helpers.ts";
import imageMagic from "./ImageMagician/imageMagic.ts";
import imageStorage from "./ImageMagician/imageStorage.ts";

const storage = await imageStorage();

const cacheImage = async (image, targetFilePath) => {
  if (ENABLE_IMAGE_CACHE) {
    return await storage.writeFile(targetFilePath, image);
  } else {
    return await image;
  }
};

const fetchAndCacheImage = async (filePath, url) => {
  const sourceRes = await fetch(url);
  if (!sourceRes.ok) {
    throw new Error("Error retrieving image from URL.");
  }
  const responseBuffer = await sourceRes.arrayBuffer();
  const imageBytes = new Uint8Array(responseBuffer);
  log("Caching image to:", filePath);
  return await cacheImage(imageBytes, filePath);
};

const chachedOrFetchedImage = async (filePath, url) => {
  try {
    log("Trying to read cached original image:", filePath);
    return await storage.readFile(filePath);
  } catch {
    log("Fatching image fresh:", url);
    return await fetchAndCacheImage(filePath, url);
  }
};

const transformedImage = async (
  { filePath, url, transforms, targetFilePath },
) => {
  try {
    log("Trying to read from storage:", targetFilePath);
    return await storage.readFile(targetFilePath);
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
