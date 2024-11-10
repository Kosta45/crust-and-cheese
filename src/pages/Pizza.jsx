import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const Pizza = () => {
  const [pizza, setPizza] = useState();
  const { id } = useParams();

  useEffect(() => {
    const getPizza = async () => {
      try {
        const { data } = await axios.get(
          "https://66c4e535b026f3cc6cf0fed2.mockapi.io/items/" + id
        );
        console.log(data);
        setPizza(data);
      } catch (error) {
        console.log(error + "Ошбика при получения конкретной пиццы");
      }
    };
    getPizza();
    console.log(pizza);
  }, []);

  if (!pizza) {
    return "Loaidng";
  }

  return (
    <div className="container">
      <img src={pizza.imageUrl} alt="" />
      <h2>{pizza.title}</h2>
      <p>{pizza.rating}</p>
      <h4>{pizza.price}</h4>
    </div>
  );
};

export default Pizza;
