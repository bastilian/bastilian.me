import type { JSX } from "preact";
import YouTubeVideo from "../../../islands/YouTubeVideo.tsx";
import { youtubeVideoRegex } from "../../../utilities/helpers.ts";

type VideoProps = {
  post: string;
};

const Video = ({ post }: VideoProps): JSX.Element =>
  youtubeVideoRegex.test(post) ? <YouTubeVideo text={post} /> : <></>;

export default Video;
