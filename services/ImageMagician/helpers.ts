import { hash } from "../../utilities/helpers.ts";

export const optionsFromParams = async (params) => {
  const url = decodeURIComponent(params.get("image"));
  const imageId = await hash(url);
  const filePath = imageId;
  const height = params.get("height") || params.get("width");
  const width = params.get("width") || params.get("height");
  const size = params.get("size") && String(params.get("size"));
  const gravity = params.get("gravity");
  const operation = params.get("operation") || "resize";
  const transform = size
    ? { size, operation, gravity }
    : { operation, gravity, height: parseInt(height), width: parseInt(width) };
  const transformHash = await hash(JSON.stringify(transform));
  const targetFilePath = `${filePath}-${transformHash}.png`;

  return {
    url,
    imageId,
    filePath,
    targetFilePath,
    transforms: [transform],
  };
};
