import { NextResponse } from "next/server";
import {
  mapCreateNoteRequest,
  mapGetNotesResponse,
} from "@/server/mappers/notes";
import { addSearchParams, createRequest } from "@/server/utils";
import { httpStatuses } from "@/shared/data";
import {
  type CreateNoteApiRequestData,
  type CreateNoteRequestData,
  type GetNotesApiResponseData,
  ResponseSuccessInfo,
} from "@/shared/types";

const createNote = createRequest(async (request, serverFetch) => {
  const body: CreateNoteRequestData = await request.json();

  if (body.date && !isNaN(new Date(body.date).valueOf())) {
    await serverFetch.post<any, CreateNoteApiRequestData>(
      "/diary/writing_free_diary_with_date",
      mapCreateNoteRequest(body),
    );
  } else {
    await serverFetch.post<any, CreateNoteApiRequestData>(
      "/diary/writing_free_diary",
      mapCreateNoteRequest(body),
    );
  }

  return NextResponse.json({
    body: new ResponseSuccessInfo("success"),
    status: httpStatuses.created,
  });
});

const getNotesByDate = createRequest(async (request, serverFetch) => {
  const { data } = await serverFetch.get<GetNotesApiResponseData>(
    addSearchParams("/diary/reading_free_diary_with_date", request, "date"),
  );

  return NextResponse.json(mapGetNotesResponse(data));
});

export const NotesRoutes = {
  POST: createNote,
  GET: getNotesByDate,
};
