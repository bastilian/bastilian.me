import { parseFeed } from "@mikaelporttila/rss";
import { hash as hasher } from "@stdext/crypto/hash";

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

export const hash = async (string: string) =>
  hasher("bcrypt", string).slice(0, 10);

export const log = (...args) => {
  if (config.debug) console.log(...args);
};

export const logWithNamespace = (namespace) => {
  if (Array.isArray(config.debug)) {
    return (...args) => {
      if (config.debug.includes(namespace)) {
        console.log(namespace, ...args);
      }
    };
  } else {
    return (...args) => {
      if (config.debug) {
        console.log(namespace, ...args);
      }
    };
  }
};
