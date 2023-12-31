import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { addItems, selectCartById, CartItem } from "../redux/slices/cartSlice";

type PizzaBlockProps = {
  id: string;
  imageUrl: string;
  name: string;
  price: number;
  sizes: number[];
  types: number[];
};

const typesNames: string[] = ["тонкое", "традиционное"];
const sizesNames: number[] = [26, 30, 40];

const PizzaBlock: React.FC<PizzaBlockProps> = ({
  id,
  name,
  imageUrl,
  price,
  sizes,
  types,
}) => {
  const [activeType, setActiveType] = useState<number>(0);
  const [activeSize, setActiveSize] = useState<number>(0);

  const dispatch = useDispatch();
  const cartItem = useSelector(selectCartById(id));

  const addedCount: number = cartItem ? cartItem.count : 0;

  const onClickAddButton = () => {
    const items: CartItem = {
      id,
      imageUrl,
      price,
      name,
      type: typesNames[activeType],
      sizes: sizesNames[activeSize],
      count: addedCount,
    };
    dispatch(addItems(items));
  };

  return (
    <div className="pizza-block">
      <Link to={`/pizza/${id}`}>
        <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
      </Link>
      <h4 className="pizza-block__title">{name}</h4>
      <div className="pizza-block__selector">
        <ul>
          {types.map((typeId) => (
            <li
              key={typeId}
              onClick={() => setActiveType(typeId)}
              className={activeType === typeId ? "active" : " "}
            >
              {typesNames[typeId]}
            </li>
          ))}
        </ul>
        <ul>
          {sizes.map((s, i) => (
            <li
              key={s}
              onClick={() => setActiveSize(i)}
              className={activeSize === i ? "active" : " "}
            >
              {s}
            </li>
          ))}
        </ul>
      </div>
      <div className="pizza-block__bottom">
        <div className="pizza-block__price">от {price} ₽</div>
        <button
          className="button button--outline button--add"
          onClick={onClickAddButton}
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
          <span>Добавить</span>
          {addedCount > 0 && <i>{addedCount}</i>}
        </button>
      </div>
    </div>
  );
};

export default PizzaBlock;
