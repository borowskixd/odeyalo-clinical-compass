import {
  type GetNoteApiResponseData,
  type GetNoteResponseData,
} from "@/shared/types/api/notes/note";

export type CreateNoteRequestData = {
  note: string;
  date?: string;
};

export type CreateNoteApiRequestData = {
  text: string;
  created_at?: string;
};

export type GetNotesResponseData = GetNoteResponseData[];

export type GetNotesApiResponseData = GetNoteApiResponseData[];
