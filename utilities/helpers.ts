import { parseFeed } from "rss";
import { crypto, toHashString } from "crypto";
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
  toHashString(
    await crypto.subtle.digest(
      "SHA-1",
      new TextEncoder().encode(string),
    ),
  ).slice(0, 10);

export const log = (...args) => {
  if (config.debug) console.log(...args);
};
