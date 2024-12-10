import { useRef, FC, memo } from "react";

type CategoriesProps = {
  value: number;
  onChangeCategory: (index: number) => void;
};
const categories: string[] = [
  "Все",
  "Мясные",
  "Вегетарианская",
  "Гриль",
  "Острые",
  "Закрытые",
];

const Categories: FC<CategoriesProps> = memo(({ value, onChangeCategory }) => {
  //refs
  const categoriesRef = useRef<HTMLUListElement>(null);

  return (
    <div className="categories">
      <ul ref={categoriesRef}>
        {categories.map((categoryName, index) => {
          return (
            <li
              onClick={() => onChangeCategory(index)}
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
});

export default Categories;
