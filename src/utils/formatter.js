import moment from "moment";

export const formatDate = (date) => {
  const dateFormatted = JSON.stringify(moment(date).format("LLL"));

  return dateFormatted.slice(1, dateFormatted.length - 1);
};

export const formatCurrency = (amount) =>
  `RD$${typeof amount === "string" ? amount : amount.toLocaleString()}`;
