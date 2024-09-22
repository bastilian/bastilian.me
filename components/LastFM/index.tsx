import type { JSX } from "preact";

import Entry from "./Scrobble.tsx";

type LastFMProps = {
  feed: {
    entries: any[]; //TODO add entry type
  };
};

const LastFM = ({ feed }: LastFMProps): JSX.Element => (
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

export default LastFM;
