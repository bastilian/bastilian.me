import Image from "../Image.tsx";

const extractMeta = (description) => {
  const [track, artist] = description.split(" by ");

  return [
    track.replace("bastilian played ", ""),
    artist,
  ];
};

const Entry = (
  { description, entry: { content: { value: content } }, ...rest },
) => {

  const [track, artist] = extractMeta(description);
  const imageUrl = content.match(/src=\"(.*)\"/)[1];

  return (
    <li>
      <Image
        src={imageUrl}
        className="inline-block rounded-md mr-2"
        params={{
          width: 36,
          height: 36,
          operation: "thumbnail",
        }}
      />
      {track} by {artist}
    </li>
  );
};

export default Entry;
