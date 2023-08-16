import React from "react";
import styles from "./Paginstion.module.scss";
import ReactPaginate from "react-paginate";

type PaginationProps = {
  value: number;
  onPageChange: (e: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({ value, onPageChange }) => {
  return (
    <ReactPaginate
      className={styles.root}
      breakLabel="..."
      nextLabel=">"
      onPageChange={(e) => onPageChange(e.selected + 1)}
      pageRangeDisplayed={4}
      pageCount={3} // Api не возвращает нужное количество страниц
      forcePage={value - 1}
      previousLabel="<"
    />
  );
};

export default Pagination;
