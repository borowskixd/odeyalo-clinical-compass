export type GetDailyTasksApiResponse = {
  id: string;
  type: "practice" | "test";
  created_at: string;
  destination_id: string;
  link_to_picture: string;
  user_id: string;
}[];

export type GetDailyTasksResponse = {
  id: string;
  taskType: DailyTaskType;
  taskId: string;
  linkToPicture: string;
}[];

export type DailyTaskType =
  | "theory"
  | "moodTracker"
  | "test"
  | "kptDiary"
  | "exercise";

export interface IDailyTaskTypes {
  theory: "theory";
  moodTracker: "moodTracker";
  test: "test";
  kptDiary: "kptDiary";
  exercise: "exercise";
}
