import { NextResponse } from "next/server";
import { mapGetNoteResponse } from "@/server/mappers";
import { createRequest } from "@/server/utils";
import { httpStatuses } from "@/shared/data";
import type { GetNotesApiResponseData } from "@/shared/types";

const getNote = createRequest<{ id: string }>(
  async (request, serverFetch, { id }) => {
    const { data: notes } = await serverFetch.get<GetNotesApiResponseData>(
      "/diary/reading_free_diary",
    );

    const data = notes.find((note) => note.free_diary_id === id);

    if (!data)
      return NextResponse.json({
        error: "not found",
        status: httpStatuses.notFound,
      });

    return NextResponse.json(mapGetNoteResponse(data));
  },
);

export const NoteRoutes = {
  GET: getNote,
};
