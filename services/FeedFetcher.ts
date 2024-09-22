import { unescapeHtml } from "escape";
import { parseFeed } from "@mikaelporttila/rss";
import { DOMParser } from "@b-fuze/deno-dom";
import config from "../_config.ts";
import { hash, log } from "../utilities/helpers.ts";
import storage from "./Storage.ts";

const MAX_ENTRIES = 10;
const store: any = await storage();
const feedCache = store?.inPath("feeds");
const openGraphCache = store?.inPath("opengraph");

const fetchCached = async (
  fetchFunc: (url: string) => Promise<string | undefined>,
  url: string,
  store: any,
  cachKey: string = "",
) => {
  if (config.cache?.feeds && store) {
    const hashedUrl = hash(url + cachKey);
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

export const extractLastLink = (entryText: string) => {
  const allLinks = new DOMParser().parseFromString(
    unescapeHtml(entryText).toString(),
    "text/html",
  )?.getElementsByTagName("a");

  return allLinks?.[allLinks.length - 1]?.getAttribute("href");
};

const fetchMarkup = async (url: string) => {
  log("Fetching", url);
  const res = await fetchCached(
    async (url: string) => {
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

export const fetchOpenGraphMeta = async (url: string) => {
  if (url) {
    const ogTags = await fetchMarkup(url);

    const og = (ogTags || []).map((
      entry: any,
    ) => [entry.getAttribute("property"), entry.getAttribute("content")])
      .reduce(
        (og: any, [property, value]: any[]) => ({ ...og, [property]: value }),
        {},
      );

    return Object.keys(og).length > 0 && og;
  }
};

// TODO use opengraph entry type here
const appendOpenGraphData = async (entry: any) => {
  const contentLink = extractLastLink(entry.description.value);
  const openGraphMeta = contentLink && await fetchOpenGraphMeta(contentLink);

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

export default async (url: string, numberOfEntries: number = MAX_ENTRIES) => {
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
      // TODO use opengraph entry type here
      (feed || {}).entries?.slice(0, numberOfEntries).map(
        async (entry: any) => {
          try {
            const newEntry = await appendOpenGraphData(entry);
            return newEntry;
          } catch {
            return entry;
          }
        },
      ) || [],
    );

    return {
      ...feed,
      entries,
    };
  } catch (e) {
    log("Error parsing feed: ", e.message);
    return {};
  }
};
