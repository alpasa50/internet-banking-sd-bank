import moment from "moment";

export const formatDate = (date) => JSON.stringify(moment(date).format("LLL"));

export const formatCurrency = (amount) => `RD$${amount.toLocalString()}`;
