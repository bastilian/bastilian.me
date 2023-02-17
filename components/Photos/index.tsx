import Image from "../Image.tsx";
import { tw } from "twind";

const Photos = ({ feed }) => {
  return (
    <div className={tw("photos")}>
      <h2 className={tw("w-full")}>
        <i class="fa fa-picture-o" aria-hidden="true"></i> Photos
      </h2>
      <div className={tw("flex gap-4 w-full")}>
        {feed.entries.map((entry) => {
          return (
            <Image
              src={entry["media:content"]?.["url"]}
              className={tw("inline-block rounded-md")}
              params={{
                width: 120,
                height: 120,
                operation: "thumbnail",
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Photos;
