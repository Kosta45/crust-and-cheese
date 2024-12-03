import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

type BasketItem = {
  id: string;
  title: string;
  imageUrl: string;
  price: number;
  type: number;
  size: number;
  count: number;
};

interface BasketSliceState {
  totalPrice: number;
  items: BasketItem[];
}

const initialState: BasketSliceState = {
  totalPrice: 0,
  items: [],
};

const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    addItem(state, action) {
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

      state.totalPrice = state.items.reduce((sum, item) => {
        return item.price * item.count + sum;
      }, 0);
    },
    minusItem(state, action) {
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
    removeItem(state, action) {
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

export const selectBasketItemById = (id: string) => {
  return (state: RootState) => {
    return state.basket.items.find((obj) => obj.id === id);
  };
};

export const { addItem, removeItem, clearItems, minusItem } =
  basketSlice.actions;

export default basketSlice.reducer;
