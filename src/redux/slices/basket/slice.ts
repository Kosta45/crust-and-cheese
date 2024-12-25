import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getItemsLocalStorage } from "../../../utils/getItemsLocalStorage";
import { calcTotalPrice } from "../../../utils/calcTotalPrice";
import { BasketItem, BasketSliceState } from "./types";

const { items, totalPrice } = getItemsLocalStorage();

const initialState: BasketSliceState = {
  totalPrice,
  items,
};

const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<BasketItem>) {
      const findItem = state.items.find((obj) => {
        return obj.id === action.payload.id;
      });

      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        });
      }

      state.totalPrice = calcTotalPrice(state.items);
    },
    minusItem(state, action: PayloadAction<string>) {
      const findItem = state.items.find((obj) => {
        return obj.id === action.payload;
      });
      if (findItem) {
        findItem.count--;
        state.totalPrice -= findItem.price;
        if (findItem.count < 1) {
          findItem.count = 0;
        }
      }
      if (state.totalPrice < 1) {
        state.totalPrice = 0;
      }
    },
    removeItem(state, action: PayloadAction<string>) {
      const findItem = state.items.find((obj) => {
        return obj.id === action.payload;
      });
      if (findItem) {
        state.totalPrice = state.totalPrice - findItem.price * findItem.count;
      }
      state.items = state.items.filter((obj) => {
        return obj.id !== action.payload;
      });
    },
    clearItems(state) {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const { addItem, removeItem, clearItems, minusItem } =
  basketSlice.actions;

export default basketSlice.reducer;
