"use client";

import type { FC } from "react";
import css from "./SearchBox.module.css";

interface SearchBoxProps {
  value: string;
  onSearch: (value: string) => void;
  onAddClick: () => void;
}

const SearchBox: FC<SearchBoxProps> = ({ value, onSearch, onAddClick }) => {
  return (
    <div className={css.toolbar}>
      <input
        className={css.input}
        type="text"
        placeholder="Search notes..."
        value={value}
        onChange={(e) => onSearch(e.target.value)}
      />

      <button className={css.button} type="button" onClick={onAddClick}>
        + Create note
      </button>
    </div>
  );
};

export default SearchBox;