export type GetNoteResponseData = {
  id: string;
  note: string;
  date: string;
  trackerID: string;
};

export type GetNoteApiResponseData = {
  id: string;
  text: string;
  created_at: string;
  user_id: string;
  mood_tracker_id: string;
};
