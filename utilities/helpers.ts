import { parseFeed } from "@mikaelporttila/rss";
import { encodeBase64Url } from "jsr:@std/encoding/base64url";

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
  encodeURI(encodeBase64Url(string)).slice(35, 100);

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
