import React, { useState, useRef } from "react";

const Categories = ({ value, onClickCategory }) => {
  // states

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
