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

  return await cacheImage(imageBytes, filePath);
};

const chachedOrFetchedImage = async (filePath, url) => {
  try {
    return await storage.readFile(filePath);
  } catch {
    return await fetchAndCacheImage(filePath, url);
  }
};

const transformedImage = async (
  { filePath, url, transforms, targetFilePath },
) => {
  try {
    return await storage.readFile(targetFilePath);
  } catch {
    return await cacheImage(
      await imageMagic(await chachedOrFetchedImage(filePath, url), transforms),
      targetFilePath,
    );
  }
};

export const transformImageFromUrlParams = async (params, host) => {
  const options = await optionsFromParams(params, host);
  console.log(options);
  const image = await transformedImage(options);

  return { image, mediaType: "image/png" };
};
