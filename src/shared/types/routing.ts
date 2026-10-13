import { type AccessRole } from "../config/access";
import { type ActiveNavId } from "@/shared/data";

interface GetLinkConfig<P> {
  params?: P extends never ? undefined : P;
  queryParams?: Record<string, string>;
}

export class Page<P extends Record<string, any> = never> {
  public readonly path: string;
  public readonly activeNavId: ActiveNavId;
  public readonly access?: AccessRole[];

  constructor(path: string, activeNavId: ActiveNavId, access?: AccessRole[]) {
    this.path = path;
    this.activeNavId = activeNavId;
    this.access = access;
  }

  public getLink = (config?: GetLinkConfig<P>): string => {
    const pathDivider = "/";
    const paramStartSymbol = ":";

    const path = this.path;

    if (!config) return path;

    const { params, queryParams } = config;

    let link: string = path;

    if (params) {
      const pathElements = path.split(pathDivider);

      for (let i = 0; i < pathElements.length; i++) {
        const pathEl = pathElements[i];

        if (pathEl[0] === paramStartSymbol) {
          pathElements[i] = params[pathEl.slice(1)];
        }
      }

      link = pathElements.join(pathDivider);
    }

    if (queryParams) {
      const queryParamsArray: string[] = [];

      for (const queryParam in queryParams) {
        queryParamsArray.push(`${queryParam}=${queryParams[queryParam]}`);
      }

      if (queryParamsArray.length) {
        link += "?" + queryParamsArray.join("&");
      }
    }

    return link;
  };

  public matchPath = (path: string): boolean => {
    const pathDivider = "/";
    const paramStartSymbol = ":";

    const patternParts = this.path.split(pathDivider).filter(Boolean);
    const urlParts = path.split(pathDivider).filter(Boolean);

    if (patternParts.length !== urlParts.length) {
      return false;
    }

    for (let i = 0; i < patternParts.length; i++) {
      const patternPart = patternParts[i];
      const urlPart = urlParts[i];

      if (patternPart.startsWith(paramStartSymbol)) {
        continue;
      }

      if (patternPart !== urlPart) {
        return false;
      }
    }

    return true;
  };
}

export interface Pages {
  main: Page;
  policy: Page;
  login: Page;
  registration: Page;
  cabinet: Page;
  application: Page<{ id: string }>;
  client: Page<{ id: string }>;
  tests: Page;
  test: Page<{ id: string }>;
  giveTest: Page;
  changePassword: Page;
  resetPassword: Page;
  psychologist: Page;
  psychologistProfile: Page<{ id: string }>;
  result: Page<{ id: string }>;
  detailResult: Page<{ id: string }>;
  hrSurvey: Page;
  psychologistSurvey: Page;
  articles: Page;
  article: Page<{ id: string }>;
  notes: Page;
  tags: Page;
  emotions: Page;
  note: Page<{ id: string }>;
  createNote: Page;
  practices: Page;
  practice: Page<{ id: string }>;
  usersActivity: Page;
  usersFeedbacks: Page;
  usersResults: Page;
  exercise: Page<{ id: string }>;
  exercisePreview: Page<{ id: string }>;
  trainingExercise: Page<{ id: string }>;
  trainingExercisePreview: Page<{ id: string }>;
  squareBreathing: Page;
  exerciseResult: Page<{ id: string; result_id: string }>;
  profile: Page;
  profileSettings: Page;
  tasks: Page;
}

interface Route {
  path: string;
  access?: AccessRole[];
}

export type Routes = Route[];
