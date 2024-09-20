import Image from "../Image.tsx";
const Photos = ({ feed }) => {
  return (
    feed?.entries && (
        <div className="photos">
          <h2 className="w-full">
            <a rel="me" href="https://pixey.org/bastilian">
              <i class="fa fa-pixelfed"></i>
            </a>{" "}
            Photos
          </h2>
          <div className="flex gap-4 w-full">
            {feed?.entries?.map((entry) => {
              return (
                <a href={entry.id}>
                  <Image
                    src={entry["media:content"]?.["url"]}
                    className="inline-block rounded-md"
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
        </div>
      ) || ""
  );
};

export default Photos;
