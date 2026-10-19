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
  const { note, date, trackerId } = data;

  return {
    text: note,
    day: date,
    mood_tracker_id: trackerId,
  };
};

export const mapGetNotesResponse = (
  data: GetNotesApiResponseData,
): GetNotesResponseData => {
  return data.map((note) => mapGetNoteResponse(note));
};
