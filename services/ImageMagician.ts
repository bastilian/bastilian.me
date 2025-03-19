import { join } from "@std/path";
import config from "../_config.ts";
import { log } from "../utilities/helpers.ts";
import { optionsFromParams } from "./ImageMagician/helpers.ts";
// import imageMagick from "./ImageMagician/imageMagick.ts";
import imageScript from "./ImageMagician/imageScript.ts";
import storage from "./Storage.ts";

const store = await storage();
const imageCache = store?.inPath("imagecache");

const cacheImage = async (image, targetFilePath) => {
  if (config.cache?.images && imageCache) {
    log("Caching image:", targetFilePath);
    return await imageCache.write(targetFilePath, image);
  } else {
    log("NOT Caching image:", targetFilePath);

    return image;
  }
};

const transformImage = ({
  // "im": imageMagick,
  "is": imageScript,
})[config.imageprocessor || "is"];

const fetchRemoteImage = async (url) => {
  const sourceRes = await fetch(url);
  if (!sourceRes.ok) {
    throw new Error("Error retrieving image from URL.");
  }
  return new Uint8Array(await sourceRes.arrayBuffer());
};

const getAndCacheImage = async (filePath, url) => {
  if (url.match(/^http[s]?\:/)?.length > 0) {
    log("Fetching original image from ", url);
    const image = await fetchRemoteImage(url);
    return await cacheImage(image, filePath);
  } else {
    const imagePath = join(config.staticDirectory, url);
    log("Reading original image from ", imagePath);
    const image = await Deno.readFile(imagePath);
    return await cacheImage(image, filePath);
  }
};

const transformedImage = async (
  { filePath, url, transforms, targetFilePath },
) => {
  log("Transforming image:", url, filePath, targetFilePath);
  const originalCachedImage = imageCache && await imageCache.read(filePath);
  const originalimage = originalCachedImage ||
    await getAndCacheImage(filePath, url);
  const transformedCachedImage = imageCache &&
    await imageCache.read(targetFilePath);
  const imageCached = transformedCachedImage ||
    await cacheImage(
      await transformImage?.(originalimage, transforms),
      targetFilePath,
    );

  return imageCached;
};

export const transformImageFromUrlParams = async (params, host) => {
  log("Image Params:", params);
  const options = await optionsFromParams(params, host);
  log("Image Options:", options);
  const image = await transformedImage(options);

  return { image, mediaType: "image/png" };
};
