import { useRef, FC, memo } from "react";

type CategoriesProps = {
  value: number;
  onChangeCategory: (index: number) => void;
};

const categories: string[] = [
  "All",
  "Meat",
  "Vegetarian",
  "Grill",
  "Spicy",
  "Closed",
];

const Categories: FC<CategoriesProps> = memo(({ value, onChangeCategory }) => {
  //refs
  const categoriesRef = useRef<HTMLUListElement>(null);
  const scrollableRef = useRef<HTMLDivElement>(null);

  const disablePageScroll = () => {
    document.body.style.transition = "overflow 0.3s easy";
    document.body.style.overflow = "hidden";
  };
  const enablePageScroll = () => {
    document.body.style.transition = "overflow 0.3s easy";
    document.body.style.overflow = "";
  };
  const handleMouseScrollX = (event: React.WheelEvent<HTMLDivElement>) => {
    const scrollContainer = scrollableRef.current;
    if (scrollContainer) {
      scrollContainer.scrollLeft += event.deltaY - 30;
    }
  };

  return (
    <div
      className="categories"
      ref={scrollableRef}
      onMouseEnter={disablePageScroll}
      onWheel={handleMouseScrollX}
      onMouseLeave={enablePageScroll}
    >
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
