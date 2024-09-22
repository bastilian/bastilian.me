import type { JSX } from "preact";
import Image from "../../Image.tsx";

const MAX_TITLE_LENGTH = 45;

export type OpenGraphData = {
  "og:title": string;
  "og:image": string;
  "og:url": string;
  "og:site_name": string;
};

type OpenGraphProps = {
  openGraphData: OpenGraphData;
};

const OpenGraph = ({ openGraphData }: OpenGraphProps): JSX.Element => {
  const truncatedTitle = openGraphData["og:title"].length > MAX_TITLE_LENGTH
    ? openGraphData["og:title"].slice(0, MAX_TITLE_LENGTH) + "..."
    : openGraphData["og:title"];

  return (
    <a
      className="flex gap-4 w-full mt-2 rounded-md opengraph-content"
      href={openGraphData["og:url"]}
    >
      {openGraphData["og:image"] && (
        <div className="w-1/5">
          <Image
            src={openGraphData["og:image"]}
            params={{
              size: "80x80^",
              operation: "thumbnail",
              gravity: "center",
            }}
            className="inline-block rounded-md"
          />
        </div>
      )}
      <div className="w-4/5 og-meta">
        <div className="text-md og-title">
          {truncatedTitle}
        </div>
        <div className="text-sm og-sitename">
          <i
            className={`fa fa-${openGraphData["og:site_name"]?.toLowerCase()}`}
          >
          </i>{" "}
          {openGraphData["og:site_name"]}
        </div>
      </div>
    </a>
  );
};

export default OpenGraph;
