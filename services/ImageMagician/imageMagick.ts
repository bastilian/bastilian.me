import {
  ImageMagick,
  initializeImageMagick,
  MagickGeometry,
} from "imagemagick";

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
