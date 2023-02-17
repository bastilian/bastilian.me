import Post from "./components/Post.tsx";
import { tw } from "twind";

const ActivityFeed = ({ feed }) => {
  return (
    <div className={tw("w-5/6 activity-feed")}>
      <h2>
        <i class="fa fa-rss" aria-hidden="true"></i>&nbsp; Activity Feed
      </h2>
      <div className={tw("grid space-y-6")}>
        {feed.entries?.slice(0, 5).map((entry, idx) => (
          <Post entry={entry} idx={idx} />
        ))}
      </div>
    </div>
  );
};

export default ActivityFeed;
