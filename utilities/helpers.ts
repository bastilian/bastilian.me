import { parseFeed } from "@mikaelporttila/rss";
import { encodeBase64 } from "@std/encoding";

import config from "../_config.ts";

export const youtubeVideoRegex = new RegExp(
  /^\https?\:\/\/?www\.youtube\.com|youtu\.?be\/([\-\_\w]+)\W/,
);

export const getFeed = async (feed: string) => {
  try {
    return await parseFeed(await (await fetch(feed)).text());
  } catch {
    return {};
  }
};

export const hash = (string: string) =>
  encodeURI(encodeBase64(new TextEncoder().encode(string))).replace(
    /[^a-zA-Z]/g,
    "",
  );

export const log = (...args: any[]) => {
  if (config.debug) console.log(...args);
};

export const logWithNamespace = (namespace: string) => {
  if (Array.isArray(config.debug)) {
    return (...args: any[]) => {
      if ((config.debug as string[]).includes(namespace)) {
        console.log(namespace, ...args);
      }
    };
  } else {
    return (...args: any[]) => {
      if (config.debug) {
        console.log(namespace, ...args);
      }
    };
  }
};
