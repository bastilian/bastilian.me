import { Handlers } from "$fresh/server.ts";
import { transformImageFromUrlParams } from "../../../services/ImageMagician.ts";

export const handler: Handlers = {
  async GET(req) {
    try {
      const reqURL = new URL(req.url);

      const { image, mediaType } = await transformImageFromUrlParams(
        reqURL.searchParams,
        `${reqURL.protocol}//${reqURL.hostname}${
          reqURL.port ? `:${reqURL.port}` : ``
        }`,
      );

      if (image.byteLength > 0) {
        const response = new Response(image, {
          headers: {
            "Content-Type": mediaType,
            "Content-Length": image.byteLength,
          },
        });

        return response;
      } else {
        throw new Error("Image processing failed");
      }
    } catch (error) {
      console.error(error);
      return new Response(error.message, { status: 500 });
    }
  },
};
