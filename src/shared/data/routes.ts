import { ACCESS } from "@/shared/config/access";
import { Page, type Pages, type Routes } from "@/shared/types";

export const pages: Pages = {
  main: new Page("/"),
  login: new Page("/login", [ACCESS.unauthorized]),
  registration: new Page("/registration", [ACCESS.unauthorized]),
  cabinet: new Page("/cabinet", [ACCESS.psychologist, ACCESS.hr]),
  application: new Page<{ id: string }>("/cabinet/applications/:id", [
    ACCESS.psychologist,
    ACCESS.hr,
  ]),
  client: new Page<{ id: string }>("/cabinet/clients/:id", [
    ACCESS.psychologist,
    ACCESS.hr,
  ]),
  tests: new Page("/tests", [ACCESS.client, ACCESS.psychologist, ACCESS.hr]),
  test: new Page<{ id: string }>("/tests/:id", [
    ACCESS.client,
    ACCESS.psychologist,
    ACCESS.hr,
  ]),
  giveTest: new Page("/tests/give", [ACCESS.psychologist, ACCESS.hr]),
  changePassword: new Page<{ token: string }>("/password/change/:token", [
    ACCESS.unauthorized,
  ]),
  resetPassword: new Page("/password/reset", [ACCESS.unauthorized]),
  psychologist: new Page("/psychologists", [
    ACCESS.client,
    ACCESS.psychologist,
    ACCESS.hr,
  ]),
  result: new Page<{ id: string }>("/results/:id", [
    ACCESS.client,
    ACCESS.psychologist,
    ACCESS.hr,
  ]),
  detailResult: new Page<{ id: string }>("/results/detail/:id", [
    ACCESS.client,
    ACCESS.psychologist,
    ACCESS.hr,
  ]),
  hrSurvey: new Page("/survey/hr", [ACCESS.client]),
  psychologistSurvey: new Page("/survey/psychologist", [ACCESS.client]),
  articles: new Page("/articles", [
    ACCESS.client,
    ACCESS.psychologist,
    ACCESS.hr,
  ]),
  article: new Page<{ id: string }>("/articles/:id", [
    ACCESS.client,
    ACCESS.psychologist,
    ACCESS.hr,
  ]),
  practices: new Page("/practices", [
    ACCESS.client,
    ACCESS.psychologist,
    ACCESS.hr,
  ]),
  practice: new Page<{ id: string }>("/practices/:id", [
    ACCESS.client,
    ACCESS.psychologist,
    ACCESS.hr,
  ]),
  notes: new Page("/practices/notes", [
    ACCESS.client,
    ACCESS.psychologist,
    ACCESS.hr,
  ]),
  note: new Page<{ id: string }>("/practices/notes/:id", [
    ACCESS.client,
    ACCESS.psychologist,
    ACCESS.hr,
  ]),
  createNote: new Page("/practices/notes/new", [
    ACCESS.client,
    ACCESS.psychologist,
    ACCESS.hr,
  ]),
  kptDiary: new Page("/practices/kptDiary", [
    ACCESS.client,
    ACCESS.psychologist,
    ACCESS.hr,
  ]),
  kptDiaryResult: new Page<{ id: string }>("/practices/kptDiary/results/:id", [
    ACCESS.client,
    ACCESS.psychologist,
    ACCESS.hr,
  ]),
  kptDiaryForm: new Page("/practices/kptDiary/form", [
    ACCESS.client,
    ACCESS.psychologist,
    ACCESS.hr,
  ]),
  problemDefinition: new Page("/practices/problemDefinition", [
    ACCESS.client,
    ACCESS.psychologist,
    ACCESS.hr,
  ]),
  problemDefinitionResult: new Page<{ id: string }>(
    "/practices/problemDefinition/results/:id",
    [ACCESS.client, ACCESS.psychologist, ACCESS.hr],
  ),
  problemDefinitionForm: new Page("/practices/problemDefinition/form", [
    ACCESS.client,
    ACCESS.psychologist,
    ACCESS.hr,
  ]),
  usersActivity: new Page("/admin/users/activity", [ACCESS.admin]),
  usersFeedbacks: new Page("/admin/users/feedbacks", [ACCESS.admin]),
  usersResults: new Page("/admin/users/results", [ACCESS.admin]),
};

export const routes: Routes = Array.from(Object.values(pages)).toSorted(
  (a, b) => {
    if (a.path > b.path) return -1;
    if (a.path < b.path) return 1;
    return 0;
  },
);
