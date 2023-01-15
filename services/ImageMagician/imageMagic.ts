import { ImageMagick, initializeImageMagick } from "image-magick/mod.ts";
import imageTransformations from "./imageTransformations.ts";

await initializeImageMagick();

export default (imageBuffer, transforms = [], fileType = "PNG") =>
  new Promise((resolve) => {
    ImageMagick.read(
      imageBuffer,
      (image) => {
        const transformedImage = transforms.reduce(
          (image, { operation, ...options }) =>
            imageTransformations[operation](image, options),
          image,
        );

        transformedImage.write((data) => resolve(data), fileType);
      },
    );
  });
