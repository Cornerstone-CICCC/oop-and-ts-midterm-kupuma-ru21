import { toInt } from "./toInt.js";

export const getTotalPrice = (obj) => {
  const totalPrice = Object.values(obj).reduce(
    (acc, curr) => (toInt(acc) + toInt(curr)) / 20,
    0
  );
  return totalPrice;
};
