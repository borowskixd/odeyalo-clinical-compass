import type {
  GetNoteApiResponseData,
  GetNoteResponseData,
} from "@/shared/types";

export const mapGetNoteResponse = (
  data: GetNoteApiResponseData,
): GetNoteResponseData => {
  const { text, id, created_at, mood_tracker_id } = data;

  return {
    id,
    note: text,
    date: created_at,
    trackerID: mood_tracker_id,
  };
};
