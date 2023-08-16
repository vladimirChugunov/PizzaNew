import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import CartItem from "./CartItem";
import { clearItems, selectCart } from "../redux/slices/cartSlice";
import CartEmpty from "../components/CartEmpty/CartEmpty";

const Cart: React.FC = () => {
  const dispatch = useDispatch();
  const { items, totalPrice } = useSelector(selectCart);
  const totalCount = items.reduce(
    (sum: number, obj: any) => obj.count + sum,
    0
  );

  const onClickClear = () => {
    if (window.confirm("Очистить корзину?")) {
      dispatch(clearItems());
    }
  };
  // условный рендер вне return
  if (!totalPrice) {
    return <CartEmpty />;
  }

  return (
    <div className="container container--cart">
      <div className="cart__top">
        <h2 className="content__title">Корзина</h2>
        <div onClick={() => onClickClear()} className="cart__clear">
          <span>Очистить корзину</span>
        </div>
      </div>
      {items.map((item: any, i: number) => (
        <CartItem key={item.id} {...item} />
      ))}
      <div className="cart__bottom">
        <div className="cart__bottom-details">
          <span>
            {" "}
            Всего пицц: <b>{totalCount} шт.</b>{" "}
          </span>
          <span>
            {" "}
            Сумма заказа: <b>{totalPrice}</b>{" "}
          </span>
        </div>
        <div className="cart__bottom-buttons">
          <Link
            to="/"
            className="button button--outline button--add go-back-btn"
          >
            <span>Вернуться назад</span>
          </Link>
          <div className="button pay-btn">
            <span>Оплатить сейчас</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
