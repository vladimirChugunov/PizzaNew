import React from "react";
import styles from "./NodeFoundBlock.module.scss";

const NotFoundBlock: React.FC = () => {
  return (
    <div className="pizza-block-wrapper">
      <div className={styles.root}>
        <h1>
          <span className={styles.span}>😒</span>
          <br></br>
          Ничего не найдено
        </h1>
        <p className={styles.description}>
          Страница на которую вы переходите отсутствует
        </p>
      </div>
    </div>
  );
};

export default NotFoundBlock;
