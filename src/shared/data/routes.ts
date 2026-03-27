import { ACCESS } from "@/shared/config/access";
import { Page, type Pages, type Routes } from "@/shared/types";

export type ActiveNavId =
  | "usersActivity"
  | "usersFeedbacks"
  | "usersResults"
  | "main"
  | "articles"
  | "practices"
  | "tests"
  | "login"
  | "cabinet"
  | "profile"
  | null;

export const pages: Pages = {
  main: new Page("/", "main"),
  policy: new Page("/policy", "main"),
  login: new Page("/login", "login", [ACCESS.unauthorized]),
  registration: new Page("/registration", "login", [ACCESS.unauthorized]),
  cabinet: new Page("/cabinet", "cabinet", [ACCESS.psychologist, ACCESS.hr]),
  application: new Page<{ id: string }>(
    "/cabinet/applications/:id",
    "cabinet",
    [ACCESS.psychologist, ACCESS.hr],
  ),
  client: new Page<{ id: string }>("/cabinet/clients/:id", "cabinet", [
    ACCESS.psychologist,
    ACCESS.hr,
  ]),
  tests: new Page("/tests", "tests", [
    ACCESS.client,
    ACCESS.psychologist,
    ACCESS.hr,
  ]),
  test: new Page<{ id: string }>("/tests/:id", "tests", [
    ACCESS.client,
    ACCESS.psychologist,
    ACCESS.hr,
  ]),
  giveTest: new Page("/tests/give", "tests", [ACCESS.psychologist, ACCESS.hr]),
  changePassword: new Page<{ token: string }>(
    "/password/change/:token",
    "main",
    [ACCESS.unauthorized],
  ),
  resetPassword: new Page("/password/reset", "login", [ACCESS.unauthorized]),
  psychologist: new Page("/psychologists", null, [
    ACCESS.client,
    ACCESS.psychologist,
    ACCESS.hr,
  ]),
  result: new Page<{ id: string }>("/results/:id", "tests", [
    ACCESS.client,
    ACCESS.psychologist,
    ACCESS.hr,
  ]),
  detailResult: new Page<{ id: string }>("/results/detail/:id", "tests", [
    ACCESS.client,
    ACCESS.psychologist,
    ACCESS.hr,
  ]),
  hrSurvey: new Page("/survey/hr", null, [ACCESS.client]),
  psychologistSurvey: new Page("/survey/psychologist", null, [ACCESS.client]),
  articles: new Page("/articles", "articles", [
    ACCESS.client,
    ACCESS.psychologist,
    ACCESS.hr,
  ]),
  article: new Page<{ id: string }>("/articles/:id", "articles", [
    ACCESS.client,
    ACCESS.psychologist,
    ACCESS.hr,
  ]),
  practices: new Page("/practices", "practices", [
    ACCESS.client,
    ACCESS.psychologist,
    ACCESS.hr,
  ]),
  practice: new Page<{ id: string }>("/practices/:id", "practices", [
    ACCESS.client,
    ACCESS.psychologist,
    ACCESS.hr,
  ]),
  notes: new Page("/practices/notes", "practices", [
    ACCESS.client,
    ACCESS.psychologist,
    ACCESS.hr,
  ]),
  note: new Page<{ id: string }>("/practices/notes/:id", "practices", [
    ACCESS.client,
    ACCESS.psychologist,
    ACCESS.hr,
  ]),
  createNote: new Page("/practices/notes/new", "practices", [
    ACCESS.client,
    ACCESS.psychologist,
    ACCESS.hr,
  ]),
  exercise: new Page<{ id: string }>("/practices/exercises/:id", "practices", [
    ACCESS.client,
    ACCESS.psychologist,
    ACCESS.hr,
  ]),
  exercisePreview: new Page<{ id: string }>(
    "/practices/exercises/:id/preview",
    "practices",
    [ACCESS.client, ACCESS.psychologist, ACCESS.hr],
  ),
  trainingExercise: new Page<{ id: string }>(
    "/practices/exercises/training/:id",
    "practices",
    [ACCESS.client, ACCESS.psychologist, ACCESS.hr],
  ),
  trainingExercisePreview: new Page<{ id: string }>(
    "/practices/exercises/training/:id/preview",
    "practices",
    [ACCESS.client, ACCESS.psychologist, ACCESS.hr],
  ),
  exerciseResult: new Page<{ id: string; result_id: string }>(
    "/practices/exercises/:id/results/:result_id",
    "practices",
    [ACCESS.client, ACCESS.psychologist, ACCESS.hr],
  ),
  squareBreathing: new Page("/practices/squareBreathing", "practices", [
    ACCESS.client,
    ACCESS.psychologist,
    ACCESS.hr,
  ]),
  usersActivity: new Page("/admin/users/activity", "usersActivity", [
    ACCESS.admin,
  ]),
  usersFeedbacks: new Page("/admin/users/feedbacks", "usersFeedbacks", [
    ACCESS.admin,
  ]),
  usersResults: new Page("/admin/users/results", "usersResults", [
    ACCESS.admin,
  ]),
  profile: new Page("/profile", "profile", [
    ACCESS.client,
    ACCESS.psychologist,
    ACCESS.hr,
  ]),
  profileSettings: new Page("/profile/settings", "profile", [
    ACCESS.client,
    ACCESS.psychologist,
    ACCESS.hr,
  ]),
  tasks: new Page("/tasks", "practices", [
    ACCESS.client,
    ACCESS.psychologist,
    ACCESS.hr,
  ]),
};

export const routes: Routes = Array.from(Object.values(pages)).toSorted(
  (a, b) => {
    if (a.path > b.path) return -1;
    if (a.path < b.path) return 1;
    return 0;
  },
);
