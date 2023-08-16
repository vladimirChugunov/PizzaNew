import React, { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

type PizzaType = {
  imageUrl: string;
  name: string;
  price: number;
};

const FullPizza: React.FC = () => {
  const { id } = useParams();
  const [pizza, setPizza] = useState<PizzaType>();
  const navigate = useNavigate();

  useEffect(() => {
    (async function fetchPizza() {
      try {
        const { data } = await axios.get(
          `https://64cb4d54700d50e3c705ad70.mockapi.io/pizzas2/${id}`
        );
        setPizza(data);
      } catch (error) {
        alert("Такой пиццы нет");
        navigate("/"); // redirect
        console.log(error);
      }
    })();
  }, []);

  if (!pizza) {
    return <>"Загрузка..."</>;
  }

  return (
    <div className="container">
      <img src={pizza.imageUrl} />
      <h2>{pizza.name}</h2>
      <h4>{pizza.price}</h4>
      <Link to="/">
        <button className="button button--outline button--add">
          <span>Назад</span>
        </button>
      </Link>
    </div>
  );
};

export default FullPizza;
