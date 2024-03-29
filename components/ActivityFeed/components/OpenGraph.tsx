import { tw } from "twind";

import Image from "../../Image.tsx";

const MAX_TITLE_LENGTH = 45;

const OpenGraph = ({ openGraphData }) => {
  const truncatedTitle = openGraphData["og:title"].length > MAX_TITLE_LENGTH
    ? openGraphData["og:title"].slice(0, MAX_TITLE_LENGTH) + "..."
    : openGraphData["og:title"];
  return (
    <a
      className={tw("flex gap-4 w-full mt-2 rounded-md opengraph-content")}
      href={openGraphData["og:url"]}
    >
      {openGraphData["og:image"] && (
        <div className={tw("w-1/5")}>
          <Image
            src={openGraphData["og:image"]}
            params={{
              size: "80x80^",
              operation: "thumbnail",
              gravity: "center",
            }}
            className={tw("inline-block rounded-md")}
          />
        </div>
      )}
      <div className={tw("w-4/5 og-meta")}>
        <div className={tw("text-md og-title")}>
          {truncatedTitle}
        </div>
        <div className={tw("text-sm og-sitename")}>
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
