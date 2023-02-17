import { ImageMagick, initializeImageMagick } from "imagemagick";
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
