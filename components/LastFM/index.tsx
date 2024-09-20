import Entry from "./Scrobble.tsx";

const LastFM = ({ feed }) => {
  return (
    <div className="lastfm">
      <h2 className="w-full">
        <a rel="me" href="https://www.last.fm/user/bastilian">
          <i class="fa fa-lastfm"></i>
        </a>{" "}
        Recently listened
      </h2>

      <ul className="space-y-2">
        {feed.entries.map((entry) => (
          <Entry entry={entry} description={entry.description?.value} />
        ))}
      </ul>
    </div>
  );
};

export default LastFM;
