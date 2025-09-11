import {
  type GetNoteApiResponseData,
  type GetNoteResponseData,
} from "@/shared/types/api/notes/note";

export type CreateNoteRequestData = {
  note: string;
  date: string;
};

export type CreateNoteApiRequestData = {
  text: string;
  day: string;
};

export type GetNotesResponseData = GetNoteResponseData[];

export type GetNotesApiResponseData = GetNoteApiResponseData[];
