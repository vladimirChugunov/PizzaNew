import React from "react";
import empty from "../../assets/img/empty-cart.png";
import { Link } from "react-router-dom";

const CartEmpty: React.FC = () => {
  return (
    <div className="cart cart--empty">
      <Link to="/">
        <h2>
          Корзина пустая<span>😒</span>
        </h2>
        <p>
          Вероятнее всего, вы не заказали пиццу.
          <br />
          Для того, чтобы заказать пиццу, перейди на главную страницу.
        </p>
        <img src={empty} alt={"Пусто"} />
      </Link>
    </div>
  );
};

export default CartEmpty;
