import type {
  GetNoteApiResponseData,
  GetNoteResponseData,
} from "@/shared/types";

export const mapGetNoteResponse = (
  data: GetNoteApiResponseData,
): GetNoteResponseData => {
  const { text, id, created_at } = data;

  return {
    id,
    note: text,
    date: created_at,
  };
};
