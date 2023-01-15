const Image = (
  {
    src,
    params,
  },
) => {
  const imageParams = new URLSearchParams();
  imageParams.append("image", encodeURIComponent(src));

  Object.entries(params).forEach(([key, value]) => {
    imageParams.append(key, value);
  });

  return src && (
    <span className="activity-post-image">
      <img
        src={`/api/image/${
          parseInt(Date.now() + (Math.random() * 100000))
        }.png?${imageParams.toString()}`}
      />
    </span>
  );
};

export default Image;
