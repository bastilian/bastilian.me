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
  try {
    const ogTags = await retry(async () => {
      return await fetchMarkup(url);
    }, {
      maxAttempts: 2,
    });
    return ogTags;
  } catch (e) {
    log("Error", e.message);
  }
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
    const fetchedFeed = await fetch(url);
    return await fetchedFeed.text();
  } catch (e) {
    log("Error fetching feed", e.message);
    return;
  }
};

export default async (url, numberOfEntries = 5) => {
  const fetchedFeed = await fetchFeed(url);
  const feed = fetchedFeed && await parseFeed(fetchedFeed);

  const entries = await Promise.all(
    (feed || []).entries.slice(0, numberOfEntries).map(async (entry) => {
      await delay(1000);
      const newEntry = await appendOpenGraphData(entry);
      log("PERF NOW", performance.now());
      return newEntry;
    }),
  );

  return {
    ...feed,
    entries,
  };
};
