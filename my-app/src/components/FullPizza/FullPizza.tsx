import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

type PizzaType = {
  imageUrl: string;
  name: string;
  price: number;
};

// interface DataPizzaType {
//   category: number;
//   id: string;
//   imageUrl: string;
//   name: string;
//   price: number;
//   rating: number;
//   sizes: number[];
//   types: number[];
// }

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
      <p>
        Sed ut perspiciatis unde omnis iste natus error sit voluptatem
        accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab
        illo inventore veritatis et quasi architecto beatae vitae dicta sunt
        explicabo.
      </p>
    </div>
  );
};

export default FullPizza;
