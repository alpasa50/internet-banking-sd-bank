import moment from "moment";

export const formatDate = (date) => {
  moment.locale("es");
  const dateFormatted = moment(date).locale("es").format("LLL");

  return dateFormatted;
};

export const formatCurrency = (amount) =>
  `RD$${typeof amount === "string" ? amount : amount.toLocaleString()}`;
