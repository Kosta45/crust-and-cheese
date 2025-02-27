export type BasketItem = {
  id: string;
  title: string;
  description: string;
  rating: string;
  imageUrl: string;
  price: number;
  type: string;
  size: number;
  count: number;
};

export interface BasketSliceState {
  totalPrice: number;
  items: BasketItem[];
}
