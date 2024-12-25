import { calcTotalPrice } from "../utils/calcTotalPrice";

export const getItemsLocalStorage = () => {
  const data = localStorage.getItem("basket");
  const items = data ? JSON.parse(data) : [];
  const totalPrice = calcTotalPrice(items);

  return {
    items,
    totalPrice: Number(totalPrice),
  };
};
