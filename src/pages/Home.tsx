//libraries react
import { useEffect, useRef, FC, useCallback } from "react";
import qs from "qs";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  setCategoryId,
  setCurrentPage,
  setFilters,
} from "../redux/slices/filter/slice";
import { fetchPizzasData } from "../redux/slices/pizza/slice";
import { RootState, useAppDispatch } from "../redux/store";

import Categories from "../components/Categories";
import Sort, { list } from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Pagination from "../components/Pagination/Pagination";
import { FilterSliceState } from "../redux/slices/filter/types";
import { PizzaSliceState } from "../redux/slices/pizza/types";

const Home: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const { categoryId, sort, currentPage, searchValue }: FilterSliceState =
    useSelector((state: RootState) => state.filter);
  const { items: dataPizzas, status: statusLoading }: PizzaSliceState =
    useSelector((state: RootState) => state.pizza);

  const onChangeCategory = useCallback((id: number) => {
    dispatch(setCategoryId(id));
  }, []);

  const onChangePage = (number: number) => {
    dispatch(setCurrentPage(number));
  };

  // Запрос для получения пицц
  const getPizzas = async () => {
    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const sortBy = sort.sortProperty.replace("-", "");
    const order = sort.sortProperty.includes("-") ? "asc" : "desc";
    const search = searchValue ? `search=${searchValue}` : "";
    dispatch(
      fetchPizzasData({
        category,
        sortBy,
        order,
        search,
        currentPage: String(currentPage),
      })
    );
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

  // При первом рендере, если он был идет проверка URL-параметров и сохраняем в redux
  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sort = list.find((obj) => obj.sortProperty === params.sortBy);

      if (sort) {
        params.sortBy = sort;
      }
      dispatch(
        setFilters({
          searchValue: String(params.search),
          categoryId: Number(params.category),
          currentPage: Number(params.currentPage),
          sort: sort || list[0],
        })
      );
      console.log(params);
      // isMounted.current = true;
      isSearch.current = true;
    }
  }, []);

  // Если был первый рендер то получаем пиццы
  useEffect(() => {
    window.scrollTo(0, 0);
    getPizzas();
  }, [categoryId, sort.sortProperty, searchValue, currentPage]);

  // Блок с пиццами.
  const pizzas = dataPizzas.map((itemObj) => (
    <PizzaBlock key={itemObj.id} {...itemObj} />
  ));

  // Блок с заглушками, скелетоном для пицц.
  const skelletons = [...new Array(6)].map((_, index) => (
    <Skeleton key={index} />
  ));

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        <Sort />
      </div>
      <h2 className="content__title">All пиццы</h2>

      {statusLoading === "error" ? (
        <h2>Error</h2>
      ) : (
        <div className="content__items">
          {statusLoading === "loading" ? skelletons : pizzas}
        </div>
      )}
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};

export default Home;
