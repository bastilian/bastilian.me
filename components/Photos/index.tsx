import Image from "../Image.tsx";

const Photos = ({ feed }) => {
  return (
    <>
      <h2>
        <i class="fa fa-picture-o" aria-hidden="true"></i> Photos
      </h2>
      {feed.entries.map((entry) => {
        return (
          <Image
            src={entry["media:content"]?.["url"]}
            params={{
              width: 120,
              height: 120,
              operation: "thumbnail",
            }}
          />
        );
      })}
    </>
  );
};

export default Photos;
