// DO NOT EDIT. This file is generated by Fresh.
// This file SHOULD be checked into source version control.
// This file is automatically updated during development when running `dev.ts`.

import * as $_404 from "./routes/_404.tsx";
import * as $_app from "./routes/_app.tsx";
import * as $_middleware from "./routes/_middleware.ts";
import * as $api_image_fileName_ from "./routes/api/image/[fileName].ts";
import * as $index from "./routes/index.tsx";
import * as $YouTubeVideo from "./islands/YouTubeVideo.tsx";
import type { Manifest } from "$fresh/server.ts";

const manifest = {
  routes: {
    "./routes/_404.tsx": $_404,
    "./routes/_app.tsx": $_app,
    "./routes/_middleware.ts": $_middleware,
    "./routes/api/image/[fileName].ts": $api_image_fileName_,
    "./routes/index.tsx": $index,
  },
  islands: {
    "./islands/YouTubeVideo.tsx": $YouTubeVideo,
  },
  baseUrl: import.meta.url,
} satisfies Manifest;

export default manifest;
