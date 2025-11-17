import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { fetchQueryClient, fetchNoteById } from "../../../lib/api";
import NoteDetailsClient from "./NoteDetails.client";

interface NoteDetailsPageProps {
  params: { id: string };
}

export const dynamic = "force-dynamic";

export default async function NoteDetailsPage({ params }: NoteDetailsPageProps) {
  const queryClient = fetchQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["note", params.id],
    queryFn: () => fetchNoteById(params.id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient />
    </HydrationBoundary>
  );
}