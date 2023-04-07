const formatDate = (dateString, format = "DD MMM YYYY") => {
  const date = new Date(dateString);
  const options = {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: format.includes("hh") ? "numeric" : undefined,
    minute: format.includes("mm") ? "numeric" : undefined,
    second: format.includes("ss") ? "numeric" : undefined,
    hour12: true,
  };
  return new Intl.DateTimeFormat("en-GB", options).format(date).toUpperCase();
};

export default formatDate;
