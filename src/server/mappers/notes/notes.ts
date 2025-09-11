import { mapGetNoteResponse } from "./note";
import {
  type CreateNoteApiRequestData,
  type CreateNoteRequestData,
  type GetNotesApiResponseData,
  type GetNotesResponseData,
} from "@/shared/types";

export const mapCreateNoteRequest = (
  data: CreateNoteRequestData,
): CreateNoteApiRequestData => {
  const { note, date } = data;

  return {
    text: note,
    day: date,
  };
};

export const mapGetNotesResponse = (
  data: GetNotesApiResponseData,
): GetNotesResponseData => {
  return data.map((note) => mapGetNoteResponse(note));
};
