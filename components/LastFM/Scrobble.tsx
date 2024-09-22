import type { JSX } from "preact";
import Image from "../Image.tsx";

const extractMeta = (description: string) => {
  const [track, artist] = description.split(" by ");

  return [
    track.replace("bastilian played ", ""),
    artist,
  ];
};

type ScrobbleProps = {
  description: string;
  entry: {
    content?: {
      value?: string;
    };
  };
};

const Scrobble = (
  {
    description,
    entry: { content: { value: content } = {} } = {},
  }: ScrobbleProps,
): JSX.Element => {
  const [track, artist] = extractMeta(description);
  const imageUrl = content?.match(/src=\"(.*)\"/)?.[1];

  return (
    <li>
      {imageUrl && (
        <Image
          src={imageUrl}
          className="inline-block rounded-md mr-2"
          params={{
            width: 36,
            height: 36,
            operation: "thumbnail",
          }}
        />
      )}
      {track} by {artist}
    </li>
  );
};

export default Scrobble;
