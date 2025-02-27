export enum FilterSortProperty {
  RATING_DESC = "rating",
  RATING_ASC = "-ratig",
  TITLE_DESC = "title",
  TITLE_ASC = "-title",
  PRICE_DESC = "price",
  PRICE_ASC = "-price",
}

export type FilterSort = {
  icon: string | undefined;
  name: string;
  sortProperty: string;
};

export interface FilterSliceState {
  searchValue: string;
  categoryId: number;
  currentPage: number;
  sort: FilterSort;
}
