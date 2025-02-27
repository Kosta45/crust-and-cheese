import { useState, useEffect, FC } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { BasketItem } from "../redux/slices/basket/types";
import { addItem } from "../redux/slices/basket/slice";
import { RootState } from "../redux/store";
import { selectBasketItemById } from "../redux/slices/basket/selectors";

const PizzaOpen: FC = ({}) => {
  const [pizza, setPizza] = useState<{
    id: string;
    title: string;
    imageUrl: string;
    description: string;
    price: number;
    rating: string;
    type: string;
    size: number;
    count: number;
  }>();
  const { idPizza } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const pizzas = useSelector((state: RootState) => {
    return state.basket.items;
  });
  console.log(pizzas);

  const onClickAdd = () => {
    dispatch(
      addItem({
        ...pizza,
      } as BasketItem)
    );
  };

  const dataPizza = pizza ? pizza.id : 0;
  const isAddedCount = useSelector(selectBasketItemById(String(dataPizza)));
  const isCount = isAddedCount ? isAddedCount.count : 0;

  useEffect(() => {
    const getPizza = async () => {
      try {
        const { data } = await axios.get(
          "https://66c4e535b026f3cc6cf0fed2.mockapi.io/items/" + idPizza
        );
        setPizza(data);
      } catch (error) {
        console.log(error + "Error getting specific pizza");
        navigate("/");
      }
    };
    getPizza();
  }, []);

  if (!pizza) {
    return "Loaidng";
  }

  return (
    <div className="pizza-container">
      <img src={pizza.imageUrl} alt="" />
      <div className="pizza-container__desc">
        <div className="pizza-container__info">
          <h2>{pizza.title}</h2>
          <p>{pizza.description}</p>
          <p>Rating: {pizza.rating}</p>
          <h4>Price: {pizza.price} $</h4>
        </div>
        <Link to="/" className="button button--black pizza-container__button">
          <span>Go back</span>
        </Link>
        <button
          className="button button--outline button--add pizza-container__button"
          onClick={onClickAdd}
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
              fill="white"
            />
          </svg>
          <span>Add</span>
          {isCount > 0 && <i>{isCount}</i>}
        </button>
      </div>
    </div>
  );
};

export default PizzaOpen;
