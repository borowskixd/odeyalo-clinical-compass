import {
  type GetNoteApiResponseData,
  type GetNoteResponseData,
} from "@/shared/types/api/notes/note";

export type CreateNoteRequestData = {
  note: string;
  date: string | null;
  trackerId: string;
};

export type CreateNoteApiRequestData = {
  text: string;
  day: string | null;
  mood_tracker_id: string;
};

export type GetNotesResponseData = GetNoteResponseData[];

export type GetNotesApiResponseData = GetNoteApiResponseData[];
