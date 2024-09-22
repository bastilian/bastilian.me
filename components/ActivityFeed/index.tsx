import type { JSX } from "preact";
import Post from "./components/Post.tsx";

// TODO Make this configurable
const POST_COUNT = 5;

type ActivityFeedProps = {
  feed: {
    entries: Array<any>;
  };
};

const ActivityFeed = ({ feed }: ActivityFeedProps): JSX.Element => (
  <div className="activity-feed">
    <h2>
      <a rel="me" href="https://mastodon.social/@bastilian">
        <i class="fa fa-mastodon"></i>
      </a>
      &nbsp; Activity Feed
    </h2>
    <div className="grid space-y-10">
      {feed.entries?.slice(0, POST_COUNT).map((entry) => (
        <Post
          entry={entry}
        />
      ))}
    </div>
  </div>
);

export default ActivityFeed;
