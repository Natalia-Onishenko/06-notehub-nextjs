"use client";

import { useState, useEffect } from "react";
import css from "./SearchBox.module.css";

interface SearchBoxProps {
  initialValue?: string;
  onSearch: (value: string) => void;
  onAddClick: () => void;
}

export default function SearchBox({
  initialValue = "",
  onSearch,
  onAddClick,
}: SearchBoxProps) {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(value.trim());
  };

  return (
    <div className={css.toolbar}>
      <form className={css.form} onSubmit={handleSubmit}>
        <input
          className={css.input}
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Search notes..."
        />
        <button className={css.button} type="submit">
          Search
        </button>
      </form>

      <button className={css.button} onClick={onAddClick}>
        + Create note
      </button>
    </div>
  );
}