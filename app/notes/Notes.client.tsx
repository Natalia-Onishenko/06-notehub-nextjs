"use client";

import { useState, type JSX } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";

import {
  fetchNotes,
  type FetchNotesResponse,
} from "../../lib/api";

import NoteList from "../../components/NoteList/NoteList";
import NoteForm from "../../components/NoteForm/NoteForm";
import SearchBox from "../../components/SearchBox/SearchBox";
import Modal from "../../components/Modal/Modal";
import Pagination from "../../components/Pagination/Pagination";

import css from "./NotesPage.module.css";

export default function NotesClient(): JSX.Element {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const pageParam = searchParams.get("page");
  const search = searchParams.get("search") ?? "";

  const page = pageParam ? Number(pageParam) : 1;

  const [debouncedSearch] = useDebounce(search, 400);

  const { data, isLoading, error } = useQuery<FetchNotesResponse>({
    queryKey: ["notes", page, debouncedSearch],
    queryFn: () =>
      fetchNotes({
        page,
        perPage: 10,
        search: debouncedSearch,
      }),
    placeholderData: (prev) => prev,
  });

  const handleSearch = (value: string): void => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set("search", value);
    else params.delete("search");
    params.set("page", "1");
    router.push(`/notes?${params.toString()}`);
  };

  const handlePageChange = (newPage: number): void => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(newPage));
    router.push(`/notes?${params.toString()}`);
  };

  if (isLoading) return <p>Loading...</p>;
  if (error || !data) return <p>Error</p>;

  return (
    <div className={css.container}>
      <h1 className={css.title}>Notes</h1>

      <Pagination
        pageCount={data.totalPages}
        currentPage={page}
        onPageChange={handlePageChange}
      />

      <SearchBox value={search} onSearch={handleSearch} onAddClick={() => setIsModalOpen(true)} />

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <NoteForm onCancel={() => setIsModalOpen(false)} />
        </Modal>
      )}

      <NoteList notes={data.notes} />
    </div>
  );
}