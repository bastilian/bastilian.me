import { unescapeHtml } from "https://deno.land/x/escape/mod.ts";
import { format } from "https://deno.land/std@0.177.0/datetime/format.ts";
import Image from "../../Image.tsx";

const Post = ({ entry, idx }) => {
  const post = entry.description.value;

  return (
    <li className="activity-post">
      <span className="activity-post-content">
        <span dangerouslySetInnerHTML={{ __html: unescapeHtml(post) }} />
      </span>
      {entry["media:content"]?.[0]["url"] && (
        <Image
          src={entry["media:content"]?.[0]["url"]}
          params={{
            size: "400x400^",
            operation: "thumbnail",
          }}
        />
      )}
      <span className="activity-post-meta">
        <i class="fa fa-mastodon"></i>{" "}
        <a href={entry["links"][0]["href"]}>
          Posted on {format(entry.published, "dd-MM-yyyy")} at{" "}
          {format(entry.published, "HH:mm")}
        </a>
      </span>
    </li>
  );
};

export default Post;
