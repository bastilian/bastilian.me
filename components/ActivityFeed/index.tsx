import Post from "./components/Post.tsx";
import { tw } from "twind";

// TODO Make this configurable
const POST_COUNT = 5

const ActivityFeed = ({ feed }) => {
  return (
    <div className={tw("activity-feed")}>
      <h2>
        <a rel="me" href="https://mastodon.social/@bastilian">
          <i class="fa fa-mastodon"></i>
        </a>
        &nbsp; Activity Feed
      </h2>
      <div className={tw("grid space-y-10")}>
        {feed.entries?.slice(0, POST_COUNT).map((entry, idx) => (
          <Post entry={entry} idx={idx} />
        ))}
      </div>
    </div>
  );
};

export default ActivityFeed;
