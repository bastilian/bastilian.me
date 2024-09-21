import { Gravity } from "imagemagick";
import { hash } from "../../utilities/helpers.ts";

const getImageUrl = (params, host) => {
  const url = decodeURIComponent(params.get("image"));
  const hostUrl = new URL(host);

  if (url.match(/^http[s]?\:/)?.length > 0) {
    return url;
  } else {
    return `${hostUrl.href}${url}`;
  }
};

export const optionsFromParams = (params, host) => {
  const url = decodeURIComponent(params.get("image")); ///getImageUrl(params, host);
  const imageId = hash(url);
  const filePath = imageId;

  const height = params.get("height") || params.get("width");
  const width = params.get("width") || params.get("height");
  const size = params.get("size") && String(params.get("size"));
  const gravity = params.get("gravity") &&
    Gravity[
      params.get("gravity")[0].toUpperCase() +
      params.get("gravity").substring(1).toLowerCase()
    ];

  const operation = params.get("operation") || "resize";
  const transform = size
    ? { size, operation, gravity }
    : { operation, gravity, height: parseInt(height), width: parseInt(width) };
  const transformHash = hash(JSON.stringify(transform));
  const targetFilePath = `${filePath}-${transformHash}.png`;

  return {
    url,
    imageId,
    filePath,
    targetFilePath,
    transforms: [transform],
  };
};
