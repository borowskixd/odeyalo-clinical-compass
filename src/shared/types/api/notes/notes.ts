export type CreateNoteRequestData = {
  note: string;
  date?: string;
};

export type CreateNoteApiRequestData = {
  text: string;
  created_at?: string;
};

export type GetNotesResponseData = {
  id: string;
  note: string;
  date: string;
}[];

export type GetNotesApiResponseData = {
  free_diary_id: string;
  text: string;
  created_at: string;
}[];
