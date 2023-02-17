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
    const res = await fetch(url);
    const og = new DOMParser().parseFromString(
      await res.text(),
      "text/html",
    )?.getElementsByTagName("meta").filter((node) =>
      node.getAttribute("property")?.startsWith("og")
    ).map((
      entry,
    ) => [entry.getAttribute("property"), entry.getAttribute("content")])
      .reduce((og, [property, value]) => ({ ...og, [property]: value }), {});

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
    return await parseFeed(await (await fetch(url)).text());
  } catch {
    return {};
  }
};

export default async (url) => {
  const feed = await fetchFeed(url);

  return {
    ...feed,
    entries: await Promise.all(feed.entries.map(appendOpenGraphData)),
  };
};
