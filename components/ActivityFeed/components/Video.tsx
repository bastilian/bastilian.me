import YouTubeVideo from "../../../islands/YouTubeVideo.tsx";
import { youtubeVideoRegex } from "../../../utilities/helpers.ts";

const Video = ({ post }) => {
  return youtubeVideoRegex.test(post) && <YouTubeVideo text={post} />;
};

export default Video;
