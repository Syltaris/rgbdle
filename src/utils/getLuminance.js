export default (r, g, b) => {
  /* sRGB lumniance calculation */
  r /= 255;
  g /= 255;
  b /= 255;

  return (
    0.2126 * Math.pow(r, 2.2) +
    0.7152 * Math.pow(g, 2.2) +
    0.0722 * Math.pow(b, 2.2)
  );
};
