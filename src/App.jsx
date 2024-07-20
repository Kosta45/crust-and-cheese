import React from "react";
import { useState } from "react";

import Header from "./components/Header";
import Categories from "./components/Categories";
import Sort from "./components/Sort";
import PizzaBlock from "./components/PizzaBlock";

import "./App.css";

import "./scss/app.scss";

const App = () => {
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
              <PizzaBlock title="Mexicano" price={300} />
              <PizzaBlock title="Hawai" />
              <PizzaBlock title="Mexicano" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
