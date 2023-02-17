import { log } from "../utilities/helpers.ts";
import { unescapeHtml } from "escape";
import { parseFeed } from "rss";
import { DOMParser, Element } from "deno_dom";

export const extractLastLink = (entryText) => {
  const allLinks = new DOMParser().parseFromString(
    unescapeHtml(entryText).toString(),
    "text/html",
  )?.getElementsByTagName("a");

  return allLinks[allLinks.length - 1]?.getAttribute("href");
};

export const fetchOpenGraphMeta = async (url) => {
  if (url) {
    log("Fetching OpenGraph data:", url);
    const res = await fetch(url);
    log("Fetched", res.status, res.body);
    const og = new DOMParser().parseFromString(
      await res.text(),
      "text/html",
    )?.getElementsByTagName("meta").filter((node) =>
      node.getAttribute("property")?.startsWith("og")
    ).map((
      entry,
    ) => [entry.getAttribute("property"), entry.getAttribute("content")])
      .reduce((og, [property, value]) => ({ ...og, [property]: value }), {});

    log("Open Graph", og);
    return og;
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

export default async (url) => {
  const feed = await fetchFeed(url);
  const entries = [];

  for await (const entry of feed.entries) {
    const newEntry = await appendOpenGraphData(entry);
    entries.push(newEntry);
  }

  return {
    ...feed,
    entries,
  };
};
