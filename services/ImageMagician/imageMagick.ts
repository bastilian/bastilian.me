import {
  ImageMagick,
  initializeImageMagick,
  MagickGeometry,
} from "imagemagick";
import { log } from "../../utilities/helpers.ts";

await initializeImageMagick();

const getGeometry = ({ size, height, width }) => {
  const sizeOptions = size ? [size] : [
    width,
    height,
  ];

  return new MagickGeometry(...sizeOptions);
};

export const resize = (image, options) => {
  image.resize(getGeometry(options));

  return image;
};

export const crop = (image, options) => {
  image.crop(getGeometry(options));

  return image;
};

export const thumbnail = (image, options) => {
  const sizingData = getGeometry(options);
  image.resize(sizingData, options.gravity);
  image.crop(sizingData, options.gravity);

  return image;
};

const imageTransformations = {
  "resize": resize,
  "crop": crop,
  "thumbnail": thumbnail,
};

export default (imageBuffer, transforms = [], fileType = "PNG") => {
  return new Promise((resolve, reject) => {
    ImageMagick.read(
      imageBuffer,
      (image) => {
        let transformedImage = image;

        for (const { operation, ...options } of transforms) {
          transformedImage = imageTransformations[operation](
            transformedImage,
            options,
          );
        }

        transformedImage.write((data) => resolve(data), fileType);
      },
    );
  });
};
