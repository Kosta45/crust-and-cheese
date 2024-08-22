import React, { useEffect, useState } from "react";

import Header from "./components/Header";
import Categories from "./components/Categories";
import Sort from "./components/Sort";
import PizzaBlock from "./components/PizzaBlock/PizzaBlock";
import Skeleton from "./components/PizzaBlock/Skeleton";

import "./App.css";

import "./scss/app.scss";

const App = () => {
  // https://66c4e535b026f3cc6cf0fed2.mockapi.io/items

  //states
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("https://66c4e535b026f3cc6cf0fed2.mockapi.io/items")
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
  }, []);

  return (
    <>
      <div className="wrapper">
        <Header />
        <div className="content">
          <div className="container">
            <div className="content__top">
              <Categories />
              <Sort />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
              {isLoading
                ? [...new Array(6)].map((itemObj, index) => (
                    <Skeleton key={index} />
                  ))
                : data.map((itemObj, index) => (
                    <PizzaBlock key={itemObj.id} {...itemObj} />
                  ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
