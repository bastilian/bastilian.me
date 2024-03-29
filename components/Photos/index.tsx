import Image from "../Image.tsx";
import { tw } from "twind";

const Photos = ({ feed }) => {
  return (
    feed?.entries && <div className={tw("photos")}>
      <h2 className={tw("w-full")}>
        <a rel="me" href="https://pixey.org/bastilian">
          <i class="fa fa-pixelfed"></i>
        </a>{" "}
        Photos
      </h2>
      <div className={tw("flex gap-4 w-full")}>
        {feed?.entries?.map((entry) => {
          return (
            <a href={entry.id}>
              <Image
                src={entry["media:content"]?.["url"]}
                className={tw("inline-block rounded-md")}
                params={{
                  width: 120,
                  height: 120,
                  operation: "thumbnail",
                }}
              />
            </a>
          );
        })}
      </div>
    </div> || ""
  );
};

export default Photos;
