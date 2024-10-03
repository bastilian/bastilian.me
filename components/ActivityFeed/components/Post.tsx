import type { JSX } from "preact";
import { unescapeHtml } from "escape";
import { format } from "@std/datetime";
import { DOMParser } from "@b-fuze/deno-dom";

import Image from "../../Image.tsx";
import OpenGraph, { OpenGraphData } from "./OpenGraph.tsx";

export const removeLastLink = (entryText = "") => {
  const post = new DOMParser().parseFromString(
    unescapeHtml(entryText).toString(),
    "text/html",
  );
  const allLinks = post?.body.getElementsByTagName("a");
  const lastLink = allLinks?.[allLinks.length - 1];
  lastLink && lastLink.remove();

  return post.body.innerHTML;
};

type PostEntry = {
  description: {
    value: string;
  };
  openGraphMeta?: OpenGraphData;
  "media:content"?: { url: string }[];
  links: { href: string }[];
  published: Date;
};

type PostProps = {
  entry: PostEntry;
};

const Post = ({ entry }: PostProps): JSX.Element => {
  const post = entry.description.value;
  const postWithoutLastLink = removeLastLink(post);

  return (
    <div>
      <div className="activity-post-content">
        <span
          dangerouslySetInnerHTML={{
            __html: unescapeHtml(
              entry.openGraphMeta ? postWithoutLastLink : post,
            ),
          }}
        />
      </div>
      {entry["media:content"]?.[0]["url"] && (
        <Image
          src={entry["media:content"]?.[0]["url"]}
          params={{
            size: "400x400^",
            operation: "thumbnail",
          }}
          className="inline-block rounded-md"
        />
      )}

      {entry.openGraphMeta && <OpenGraph openGraphData={entry.openGraphMeta} />}

      <div className="activity-post-meta mt-2">
        <a href={entry["links"]?.[0]["href"]}>
          Posted on {format(entry.published, "dd-MM-yyyy")} at{" "}
          {format(entry.published, "HH:mm")}
        </a>
      </div>
    </div>
  );
};

export default Post;
