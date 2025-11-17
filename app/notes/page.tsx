import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { fetchQueryClient, fetchNotes } from "../../lib/api";
import NotesClient from "./Notes.client";

interface NotesPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export const dynamic = "force-dynamic";

export default async function NotesPage({ searchParams }: NotesPageProps) {
  const params = await searchParams;

  const page = Number(params.page ?? "1");
  const search =
    typeof params.search === "string" ? params.search : "";

  const queryClient = fetchQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["notes", page, search],
    queryFn: () => fetchNotes({ page, perPage: 10, search }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient />
    </HydrationBoundary>
  );
}