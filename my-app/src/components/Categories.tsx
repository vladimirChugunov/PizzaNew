import React, { useCallback } from "react";

import { useSelector, useDispatch } from "react-redux";
import { setCategory, selectFilterSort } from "../redux/slices/filterSlice";

const categories = [
  "Все",
  "Мясные",
  "Вегетарианская",
  "Гриль",
  "Острые",
  "Закрытые",
];

const Categories: React.FC = () => {
  const dispatch = useDispatch();
  const categoryId: number = useSelector(selectFilterSort);

  const onChangeCategory = useCallback((idx: number) => {
    dispatch(setCategory(idx));
  }, []);

  return (
    <div className="categories">
      <ul>
        {categories.map((el, i) => (
          <li
            key={i} //список статичный можно передавать индекс
            onClick={() => onChangeCategory(i)}
            className={categoryId === i ? "active" : " "}
          >
            {el}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default React.memo(Categories);
