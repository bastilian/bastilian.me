const youtubeVideoRegex = new RegExp(
  /^\https?\:\/\/?www\.youtube\.com|youtu\.?be\/([\-\_\w]+)\W/,
);

const YouTubeVideo = ({ text, ...props }) => {
  const id = text.match?.(
    youtubeVideoRegex,
  )[1];

  return (
    <div className="youtube-video">
      <iframe
        src={`https://www.youtube.com/embed/${id}?modestbranding=1`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        {...props}
      >
      </iframe>
    </div>
  );
};

export default YouTubeVideo;
