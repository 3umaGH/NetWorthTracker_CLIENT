import { negativeColor, positiveColor } from "./constants";

export const getColor = (inputNum: number) => {
  if (inputNum === null || inputNum === undefined) return "black";

  if (inputNum > 0) return positiveColor;
  else if (inputNum < 0) return negativeColor;
};

export const formatCurrency = (
  inputNum: number,
  currency: string,
  digits = 0
) => {
  return new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: currency,
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  }).format(inputNum);
};

export const formatBTC = (inputNum: number, digits = 5) => {
  return `${inputNum.toFixed(digits)} ₿`;
};

export const formatTimeMillis = (inputNum: number) => {
  const fullDate = new Date(inputNum);

  return `${fullDate.getFullYear()}/${
    fullDate.getMonth() + 1
  }/${fullDate.getDate()}`;
};
