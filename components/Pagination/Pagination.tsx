"use client";

import type { FC } from "react";
import ReactPaginate from "react-paginate";
import css from "./Pagination.module.css";

interface PaginationProps {
  pageCount: number;          // загальна кількість сторінок
  currentPage: number;        // поточна сторінка (0-based для ReactPaginate)
  onPageChange: (page: number) => void; // 0-based індекс
}

const Pagination: FC<PaginationProps> = ({
  pageCount,
  currentPage,
  onPageChange,
}) => {
  return (
    <ReactPaginate
      pageCount={pageCount}
      forcePage={currentPage}
      onPageChange={(event) => onPageChange(event.selected)}
      previousLabel="Prev"
      nextLabel="Next"
      containerClassName={css.pagination}
      activeClassName={css.active}
    />
  );
};

export default Pagination;