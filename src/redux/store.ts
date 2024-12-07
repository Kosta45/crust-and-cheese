import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

import filterSlice from "./slices/filterSlice";
import basketSlice from "./slices/basketSlice";
import pizzaSlice from "./slices/pizzasSlice";

export const store = configureStore({
  reducer: {
    filter: filterSlice,
    basket: basketSlice,
    pizza: pizzaSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
