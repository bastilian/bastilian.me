const Image = (
  {
    src,
    params,
    ...props
  },
) => {
  const imageParams = new URLSearchParams();
  imageParams.append("image", encodeURIComponent(src));

  Object.entries(params).forEach(([key, value]) => {
    imageParams.append(key, value);
  });

  return src && (
    <img
      src={`/api/image/${
        parseInt(Date.now() + (Math.random() * 100000))
      }.png?${imageParams.toString()}`}
      {...props}
    />
  );
};

export default Image;
