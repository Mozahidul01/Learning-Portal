const truncateText = (text, maxLength = 200) => {
  if (typeof text !== "string") {
    throw new TypeError('The "text" argument must be a string');
  }

  if (typeof maxLength !== "number") {
    throw new TypeError('The "maxLength" argument must be a number');
  }

  if (maxLength <= 0) {
    throw new RangeError('The "maxLength" argument must be greater than zero');
  }

  const words = text.trim().split(/\s+/);

  return words.length > maxLength
    ? `${words.slice(0, maxLength).join(" ")}...`
    : text;
};

export default truncateText;
