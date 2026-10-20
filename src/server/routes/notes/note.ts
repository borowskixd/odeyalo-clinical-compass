import { NextResponse } from "next/server";
import { mapGetNoteResponse } from "@/server/mappers";
import { createRequest } from "@/server/utils";
import { httpStatuses } from "@/shared/data";
import type { GetNoteApiResponseData } from "@/shared/types";

const getNote = createRequest<{ id: string }>(
  async (request, serverFetch, { id }) => {
    try {
      const { data: note } = await serverFetch.get<GetNoteApiResponseData>(
        `/diary/by_mood_tracker/${id}`,
      );

      if (!note) {
        return NextResponse.json({
          error: "not found",
          status: httpStatuses.notFound,
        });
      }

      return NextResponse.json(mapGetNoteResponse(note));
    } catch {
      return NextResponse.json({
        error: "not found",
        status: httpStatuses.notFound,
      });
    }
  },
);

export const NoteRoutes = {
  GET: getNote,
};
