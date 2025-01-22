import { FC } from "react";
import { Link } from "react-router-dom";

import basketEmptyImg from "../../public/empty-cart.png";

const BasketEmpty: FC = () => {
  return (
    <div className="container container--cart">
      <div className="cart cart--empty">
        <h2>
          The basket is empty <span>😕</span>
        </h2>
        <p>
          Chances are you haven't ordered pizza yet.
          <br />
          To order pizza, go to the main page.
        </p>
        <img src={basketEmptyImg} alt="Empty cart" />
        <Link to="/" className="button button--black">
          <span>Go back</span>
        </Link>
      </div>
    </div>
  );
};

export default BasketEmpty;
