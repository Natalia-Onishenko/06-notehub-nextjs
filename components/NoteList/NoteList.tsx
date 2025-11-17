"use client";

import Link from "next/link";
import type { FC } from "react";
import type { Note } from "@/types/note";
import css from "./NoteList.module.css";

interface NoteListProps {
  notes: Note[];
  onDelete: (id: string) => void;
}

const NoteList: FC<NoteListProps> = ({ notes, onDelete }) => {
  return (
    <ul className={css.list}>
      {notes.map((note) => (
        <li className={css.item} key={note.id}>
          <h2 className={css.title}>{note.title}</h2>
          <p className={css.content}>{note.content}</p>

          <div className={css.footer}>
            <Link href={`/notes/${note.id}`} className={css.details}>
              View details
            </Link>

            <span className={css.tag}>{note.tag}</span>

            <button
              className={css.button}
              onClick={() => onDelete(note.id)}
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default NoteList;