import { tw } from "twind";

import Image from "../../Image.tsx";

const OpenGraph = ({ openGraphData }) => {
  return (
    <a
      className={tw("flex gap-4 w-full my-4")}
      href={openGraphData["og:url"]}
    >
      {openGraphData["og:image"] && (
        <div>
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
      <div className="og-meta">
        <div className={tw("text-md og-title")}>
          {openGraphData["og:title"]}
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
