import React, { useState, useRef } from "react";

const Categories = () => {
  // states
  const [activeIndex, setActiveIndex] = useState(0);

  //refs
  const categoriesRef = useRef();

  const categories = [
    "Все",
    "Мясные",
    "Вегетарианская",
    "Гриль",
    "Острые",
    "Закрытые",
  ];
  const activeCategory = (index) => {
    setActiveIndex(index);
  };

  return (
    <div className="categories">
      <ul ref={categoriesRef}>
        {categories.map((item, index) => {
          return (
            <li
              onClick={() => activeCategory(index)}
              className={activeIndex === index ? "active" : ""}
              key={index}
            >
              {item}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Categories;
