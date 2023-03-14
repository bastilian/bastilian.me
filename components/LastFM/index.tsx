import { tw } from "twind";

const extractMeta = (description) => {
  const [track, artist] = description.split(" by ");

  return [
    track.replace("bastilian played ", ""),
    artist,
  ];
};

const Entry = ({ description }) => {
  const [track, artist] = extractMeta(description);
  return (
    <li>
      <i class="m-2 fa fa-music"></i> {track} by {artist}
    </li>
  );
};

const LastFM = ({ feed }) => {
  // console.log("FEEDLFM", feed);

  return (
    <div className={tw("lastfm")}>
      <h2 className={tw("w-full")}>
        <a rel="me" href="https://www.last.fm/user/bastilian">
          <i class="fa fa-lastfm"></i>
        </a>{" "}
        Recently listened
      </h2>

      <ul className={tw("space-y-2")}>
        {feed.entries.map((entry) => (
          <Entry description={entry.description?.value} />
        ))}
      </ul>
    </div>
  );
};

export default LastFM;
