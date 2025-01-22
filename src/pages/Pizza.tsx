import { useState, useEffect, FC } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const Pizza: FC = () => {
  const [pizza, setPizza] = useState<{
    imageUrl: string;
    title: string;
    rating: string;
    price: string;
  }>();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getPizza = async () => {
      try {
        const { data } = await axios.get(
          "https://66c4e535b026f3cc6cf0fed2.mockapi.io/items/" + id
        );
        setPizza(data);
      } catch (error) {
        console.log(error + "Error getting specific pizza");
        navigate("/");
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
