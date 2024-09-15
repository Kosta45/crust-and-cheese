import React, { useState, useEffect, useContext } from "react";

import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Pagination from "./Pagination/Pagination";
import { SearchContext } from "../App";

const Home = () => {
  const { searchValue } = useContext(SearchContext);
  //states
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [categoryId, setCategoryId] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortType, setSortType] = useState({
    name: "популярности",
    sort: "title",
  });

  useEffect(() => {
    setIsLoading(true);

    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const sortBy = sortType.sort.replace("-", "");
    const order = sortType.sort.includes("-") ? "asc" : "desc";
    const search = searchValue ? `search=${searchValue}` : "";

    fetch(
      `https://66c4e535b026f3cc6cf0fed2.mockapi.io/items?page=${currentPage}&limit=8&${category}&sortBy=${sortBy}&order=${order}&${search}`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error: " + response.status);
        }
        return response.json();
      })
      .then((data) => {
        setData(data);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error.message);
      });
    window.scrollTo(0, 0);
  }, [categoryId, sortType, searchValue, currentPage]);

  const pizzas = data.map((itemObj, index) => (
    <PizzaBlock key={itemObj.id} {...itemObj} />
  ));

  const skelletons = [...new Array(6)].map((itemObj, index) => (
    <Skeleton key={index} />
  ));

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          value={categoryId}
          onClickCategory={(index) => setCategoryId(index)}
        />
        <Sort value={sortType} onClickSort={(index) => setSortType(index)} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? skelletons : pizzas}</div>
      <Pagination onChangePage={(number) => setCurrentPage(number)} />
    </div>
  );
};

export default Home;
