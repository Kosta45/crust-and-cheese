//libraries react
import React, { useState, useEffect, useContext, useRef } from "react";
import qs from "qs";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  setCategoryId,
  setCurrentPage,
  setFilters,
} from "../redux/slices/filterSlice";
import { fetchPizzasData } from "../redux/slices/pizzasSlice";

import Categories from "../components/Categories";
import Sort, { list } from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Pagination from "./Pagination/Pagination";
import { SearchContext } from "../App";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const { categoryId, sort, currentPage } = useSelector(
    (state) => state.filter
  );
  const dataPizzas = useSelector((state) => state.pizza.items);

  const { searchValue } = useContext(SearchContext);

  //states
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  const onChangePage = (number) => {
    dispatch(setCurrentPage(number));
  };

  // Запрос для получения пицц
  const getPizzas = async () => {
    setIsLoading(true);

    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const sortBy = sort.sortProperty.replace("-", "");
    const order = sort.sortProperty.includes("-") ? "asc" : "desc";
    const search = searchValue ? `search=${searchValue}` : "";

    try {
      dispatch(
        fetchPizzasData({
          category,
          sortBy,
          order,
          search,
          currentPage,
        })
      );
    } catch (err) {
      console.log("Error", err);
    } finally {
      setIsLoading(false);
    }

    window.scrollTo(0, 0);
  };

  // Если был первый рендер и изменены параметры, то меняем параметры в адресной строке.
  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sort.sortProperty,
        categoryId,
        currentPage,
      });

      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sort.sortProperty, currentPage]);

  // При первом рендере, если он был идет проверка URL-параметров и сохраняем в redax
  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));

      const sort = list.find((obj) => obj.sortProperty === params.sortProperty);

      dispatch(
        setFilters({
          ...params,
          sort,
        })
      );
      isSearch.currentPage = true;
    }
  }, []);

  // Если был первый рендер то получаем пиццы
  useEffect(() => {
    window.scrollTo(0, 0);
    getPizzas();
  }, [categoryId, sort.sortProperty, searchValue, currentPage]);

  // Блок с пиццами.
  const pizzas = dataPizzas.map((itemObj, index) => (
    <PizzaBlock key={itemObj.id} {...itemObj} />
  ));

  // Блок с заглушками, скелетоном для пицц.
  const skelletons = [...new Array(6)].map((itemObj, index) => (
    <Skeleton key={index} />
  ));

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onClickCategory={onChangeCategory} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? skelletons : pizzas}</div>
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};

export default Home;
