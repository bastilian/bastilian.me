import { log } from "../utilities/helpers.ts";
import { unescapeHtml } from "escape";
import { parseFeed } from "rss";
import { DOMParser, Element } from "deno_dom";
import { delay, retry } from "https://deno.land/std@0.177.0/async/mod.ts";

export const extractLastLink = (entryText) => {
  const allLinks = new DOMParser().parseFromString(
    unescapeHtml(entryText).toString(),
    "text/html",
  )?.getElementsByTagName("a");

  return allLinks[allLinks.length - 1]?.getAttribute("href");
};

const fetchMarkup = async (url) => {
  log("Fetching", url);
  const res = await fetch(url);
  if (res.status === 429) {
    throw new Error("Too many requests");
  }

  return new DOMParser().parseFromString(
    await res.text(),
    "text/html",
  )?.getElementsByTagName("meta").filter((node) =>
    node.getAttribute("property")?.startsWith("og")
  );
};

const fetchWithRetryAndDelay = async (url) => {
  let retries = 0;
  let ogTags;

  try {
    ogTags = await retry(async () => {
      const delayPromise = delay(300);
      await delayPromise;
      const markup = await fetchMarkup(url);
      retries++;
      return markup;
    }, {
      maxAttempts: 3,
    });
  } catch (e) {
    log("Error", e.message);
  }

  if (retries > 0) {
    log("Retried", retries, "times");
  }

  return ogTags;
};

export const fetchOpenGraphMeta = async (url) => {
  if (url) {
    const ogTags = await fetchWithRetryAndDelay(url);

    const og = (ogTags || []).map((
      entry,
    ) => [entry.getAttribute("property"), entry.getAttribute("content")])
      .reduce((og, [property, value]) => ({ ...og, [property]: value }), {});

    log("Open Graph:", og);
    return Object.keys(og).length > 0 && og;
  }
};

const appendOpenGraphData = async (entry) => {
  const contentLink = extractLastLink(entry.description?.value);
  const openGraphMeta = await fetchOpenGraphMeta(contentLink);

  return {
    ...entry,
    ...openGraphMeta ? { openGraphMeta } : {},
  };
};

export const fetchFeed = async (url: string) => {
  try {
    log("Fetching and parsing feed:", url);
    return await parseFeed(await (await fetch(url)).text());
  } catch {
    return {};
  }
};

export default async (url, numberOfEntries = 5) => {
  const feed = await fetchFeed(url);
  const entries = [];

  for await (const entry of feed.entries.slice(0, numberOfEntries)) {
    const newEntry = await appendOpenGraphData(entry);
    const delayPromise = delay(300);
    await delayPromise;
    entries.push(newEntry);
  }

  return {
    ...feed,
    entries,
  };
};
