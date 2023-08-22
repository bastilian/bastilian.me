import { unescapeHtml } from "escape";
import { parseFeed } from "rss";
import { DOMParser } from "deno_dom";
import config from "../_config.ts";
import { hash, log } from "../utilities/helpers.ts";
import storage from "./Storage.ts";

const MAX_ENTRIES = 10;

const store = await storage();
const feedCache = store?.inPath("feeds");
const openGraphCache = store?.inPath("opengraph");

const fetchCached = async (fetchFunc, url, store, cachKey = "") => {
  if (config.cache?.feeds && store) {
    const hashedUrl = await hash(url + cachKey);
    const cachedResult = await store.read(hashedUrl);

    if (cachedResult) {
      log("Returning cached result");
      return new TextDecoder().decode(cachedResult);
    } else {
      log("Fetching and caching result");
      const result = await fetchFunc(url);
      if (result) {
        const cachedResult = await store.write(hashedUrl, result);
        return new TextDecoder().decode(cachedResult);
      } else {
        log("Empty result not cached");
        return;
      }
    }
  } else {
    log("Not using cache for fetching");

    return await fetchFunc(url);
  }
};

export const extractLastLink = (entryText) => {
  const allLinks = new DOMParser().parseFromString(
    unescapeHtml(entryText).toString(),
    "text/html",
  )?.getElementsByTagName("a");

  return allLinks?.[allLinks.length - 1]?.getAttribute("href");
};

const fetchMarkup = async (url) => {
  log("Fetching", url);
  const res = await fetchCached(
    async (url) => {
      const res = await fetch(url);
      if (res.status === 200) {
        return await res.text();
      }
    },
    url,
    openGraphCache,
  );

  return res && new DOMParser().parseFromString(
    res,
    "text/html",
  )?.getElementsByTagName("meta").filter((node) =>
    node.getAttribute("property")?.startsWith("og")
  );
};

export const fetchOpenGraphMeta = async (url) => {
  if (url) {
    const ogTags = await fetchMarkup(url);

    const og = (ogTags || []).map((
      entry,
    ) => [entry.getAttribute("property"), entry.getAttribute("content")])
      .reduce((og, [property, value]) => ({ ...og, [property]: value }), {});

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

export default async (url, numberOfEntries = MAX_ENTRIES) => {
  const cacheKey = (() => {
    const currentDateTime = new Date(Date.now());

    return currentDateTime.getDay() + "-" + currentDateTime.getHours();
  })();
  const fetchedFeed = await fetchCached(
    fetchFeed,
    url,
    feedCache,
    cacheKey,
  );
  try {
  const feed = fetchedFeed && await parseFeed(fetchedFeed);

  const entries = await Promise.all(
    (feed || {}).entries?.slice(0, numberOfEntries).map(async (entry) => {
      try {
        const newEntry = await appendOpenGraphData(entry);
        return newEntry;
      } catch {
        return entry;
      }
    }) || [],
  );

  return {
    ...feed,
    entries,
  };
} catch (e) {
  log('Error parsing feed: ', e.message)
  return {}
}
};
