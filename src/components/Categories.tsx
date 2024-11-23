import { useRef, FC } from "react";

type CategoriesProps = {
  value: number;
  onClickCategory: any;
};

const Categories: FC<CategoriesProps> = ({ value, onClickCategory }) => {
  //refs
  const categoriesRef = useRef<HTMLUListElement>(null);

  const categories = [
    "Все",
    "Мясные",
    "Вегетарианская",
    "Гриль",
    "Острые",
    "Закрытые",
  ];

  return (
    <div className="categories">
      <ul ref={categoriesRef}>
        {categories.map((categoryName, index) => {
          return (
            <li
              onClick={() => onClickCategory(index)}
              className={value === index ? "active" : ""}
              key={index}
            >
              {categoryName}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Categories;
