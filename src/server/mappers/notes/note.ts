import type {
  GetNoteApiResponseData,
  GetNoteResponseData,
} from "@/shared/types";

export const mapGetNoteResponse = (
  data: GetNoteApiResponseData,
): GetNoteResponseData => {
  const { text, free_diary_id, created_at } = data;

  return {
    id: free_diary_id,
    note: text,
    date: created_at,
  };
};
