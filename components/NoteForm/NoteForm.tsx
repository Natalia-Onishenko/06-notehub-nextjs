"use client";

import { useState } from "react";
import type { CreateNoteDto } from "../../lib/api";
import type { NoteTag } from "../../types/note";
import css from "./NoteForm.module.css";

interface NoteFormProps {
  onSubmit: (payload: CreateNoteDto) => void;
}

export default function NoteForm({ onSubmit }: NoteFormProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tag, setTag] = useState<NoteTag>("Todo");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ title, content, tag });
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <input
        className={css.input}
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Note title"
        required
      />

      <textarea
        className={css.textarea}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Note content"
        required
      />

      <select
        className={css.select}
        value={tag}
        onChange={(e) => setTag(e.target.value as NoteTag)}
      >
        <option>Todo</option>
        <option>Work</option>
        <option>Personal</option>
        <option>Meeting</option>
        <option>Shopping</option>
      </select>

      <button className={css.button} type="submit">
        Create note
      </button>
    </form>
  );
}