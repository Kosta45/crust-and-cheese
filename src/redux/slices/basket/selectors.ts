import { RootState } from "../../store";

export const selectBasketItemById = (id: string) => {
  return (state: RootState) => {
    return state.basket.items.find((obj) => obj.id === id);
  };
};
