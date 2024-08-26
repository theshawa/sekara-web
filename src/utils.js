const dateFormatter = Intl.DateTimeFormat("default", {
  dateStyle: "medium",
});

export const formatDate = (date) => {
  return dateFormatter.format(date);
};
