"use client";

import { useState, type JSX } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import {
  fetchNotes,
  deleteNote,
  createNote,
  type CreateNoteDto,
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
  const queryClient = useQueryClient();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const pageParam = searchParams.get("page");
  const page = pageParam ? Number(pageParam) : 1;
  const search = searchParams.get("search") ?? "";

  const { data, isLoading, error } = useQuery<FetchNotesResponse>({
    queryKey: ["notes", page, search],
    queryFn: () => fetchNotes({ page, perPage: 10, search }),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });

  const createMutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      setIsModalOpen(false);
    },
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
    params.set("page", String(newPage + 1));
    router.push(`/notes?${params.toString()}`);
  };

  if (isLoading) return <p>Loading, please wait...</p>;
  if (error || !data) return <p>Something went wrong.</p>;

  return (
    <div className={css.container}>
      <h1 className={css.title}>Notes</h1>

      <Pagination
        pageCount={data.totalPages}
        currentPage={page - 1}
        onPageChange={handlePageChange}
      />

      <SearchBox
        initialValue={search}
        onSearch={handleSearch}
        onAddClick={() => setIsModalOpen(true)}
      />

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <NoteForm onSubmit={(payload) => createMutation.mutate(payload)} />
        </Modal>
      )}

      <NoteList
        notes={data.notes}
        onDelete={(id) => deleteMutation.mutate(id)}
      />
    </div>
  );
}