export type FetchPizzasArgs = {
  currentPage: string;
  category: string;
  sortBy: string;
  order: string;
  search: string;
};

export type PizzaItem = {
  id: string;
  title: string;
  imageUrl: string;
  price: number;
  types: number[];
  sizes: number[];
  count: number;
};

export enum Status {
  LOADING = "loading",
  SUCCESS = "succeeded",
  ERRROR = "error",
}

export interface PizzaSliceState {
  items: PizzaItem[];
  status: Status;
}
