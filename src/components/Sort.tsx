import { useEffect, useRef, useState, FC, memo } from "react";
import { useSelector, useDispatch } from "react-redux";

import { RootState } from "../redux/store";
import { setSort } from "../redux/slices/filter/slice";
import { FilterSortProperty } from "../redux/slices/filter/types";

export type ListItem = {
  name: string;
  sortProperty: string;
};

export const list: ListItem[] = [
  { name: "популярности (DESC)", sortProperty: FilterSortProperty.RATING_DESC },
  { name: "популярности (ASC)", sortProperty: FilterSortProperty.RATING_ASC },
  { name: "цене (DESC)", sortProperty: FilterSortProperty.PRICE_DESC },
  { name: "цене (ASC)", sortProperty: FilterSortProperty.PRICE_ASC },
  { name: "алфавиту (DESC)", sortProperty: FilterSortProperty.TITLE_DESC },
  { name: "алфавиту (ASC)", sortProperty: FilterSortProperty.TITLE_ASC },
];

const Sort: FC = memo(() => {
  const dispatch = useDispatch();
  const sort = useSelector((state: RootState) => state.filter.sort);
  const sortRef = useRef<HTMLDivElement>(null);

  //states
  const [visibleSort, setVisibleSort] = useState(false);

  const changeVisibleSort = () => {
    if (visibleSort) {
      setVisibleSort(false);
    } else {
      setVisibleSort(true);
    }
  };

  const onClickSort = (obj: ListItem) => {
    dispatch(setSort(obj));
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sortRef.current && !event.composedPath().includes(sortRef.current)) {
        setVisibleSort(false);
      }
    };

    document.body.addEventListener("click", handleClickOutside);

    return () => {
      document.body.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="sort" ref={sortRef}>
      <div className="sort__label" onClick={() => changeVisibleSort()}>
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b>Сортировка по:</b>
        <span>по {sort.name}</span>
      </div>
      {visibleSort && (
        <div className="sort__popup">
          <ul>
            {list.map((obj) => {
              return (
                <li
                  onClick={() => {
                    onClickSort(obj);
                    setVisibleSort(false);
                  }}
                  className={
                    sort.sortProperty === obj.sortProperty ? "active" : ""
                  }
                  key={obj.name}
                >
                  {obj.name}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
});

export default Sort;
