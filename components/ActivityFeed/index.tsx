import Post from "./components/Post.tsx";

const ActivityFeed = ({ feed }) => {
  return (
    <div className="activity-feed">
      <h2>
        <i class="fa fa-rss" aria-hidden="true"></i>&nbsp; Activity Feed
      </h2>
      <ul>
        {feed.entries?.slice(0, 9).map((entry, idx) => (
          <Post entry={entry} idx={idx} />
        ))}
      </ul>
    </div>
  );
};

export default ActivityFeed;
