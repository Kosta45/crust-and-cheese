import { BasketItem } from "../redux/slices/basketSlice";

export const calcTotalPrice = (items: BasketItem[]) => {
  return items.reduce((sum, item) => {
    return item.price * item.count + sum;
  }, 0);
};
