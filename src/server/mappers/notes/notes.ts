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
    created_at: date,
  };
};

export const mapGetNotesResponse = (
  data: GetNotesApiResponseData,
): GetNotesResponseData => {
  return data.map((note) => {
    const { text, free_diary_id, created_at } = note;

    return {
      id: free_diary_id,
      note: text,
      date: created_at,
    };
  });
};
