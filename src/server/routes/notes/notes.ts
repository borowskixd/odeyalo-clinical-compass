import { NextResponse } from "next/server";
import {
  mapCreateNoteRequest,
  mapGetNotesResponse,
} from "@/server/mappers/notes";
import { createRequest } from "@/server/utils";
import { httpStatuses } from "@/shared/data";
import {
  type CreateNoteApiRequestData,
  type CreateNoteRequestData,
  type GetNotesApiResponseData,
  ResponseSuccessInfo,
} from "@/shared/types";

const createNote = createRequest(async (request, serverFetch) => {
  const body: CreateNoteRequestData = await request.json();

  await serverFetch.post<any, CreateNoteApiRequestData>(
    "/diary",
    mapCreateNoteRequest(body),
  );

  return NextResponse.json({
    body: new ResponseSuccessInfo("success"),
    status: httpStatuses.created,
  });
});

const getNotesByDate = createRequest(async (request, serverFetch) => {
  const date = request.nextUrl.searchParams.get("date");

  const { data } = await serverFetch.get<GetNotesApiResponseData>(
    `/diary?day=${date}`,
  );

  return NextResponse.json(mapGetNotesResponse(data));
});

export const NotesRoutes = {
  POST: createNote,
  GET: getNotesByDate,
};
