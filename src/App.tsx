import { FC } from "react";
import { Route, Routes } from "react-router-dom";

import Header from "./components/Header";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Basket from "./pages/Basket";
import PizzaOpen from "./pages/PizzaOpen";

import "./App.css";
import "./scss/app.scss";

const App: FC = () => {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="basket" element={<Basket />} />
          <Route path="pizza/:idPizza" element={<PizzaOpen />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
