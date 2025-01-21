import { ACCESS, type AccessRole } from "../config/access";
import { pages, routes } from "../data";

const checkPath = (pathname: string, template: string): boolean => {
  const pathDivider = "/";
  const paramIdentifier = ":";

  const pathElements = pathname.split(pathDivider);
  const templateElements = template.split(pathDivider);

  if (pathElements.length !== templateElements.length) return false;

  const pathElRegExp = /[A-Za-z0-9-_.~%]/i;
  const n = pathElements.length;

  for (let i = 0; i < n; i++) {
    const pathEl = pathElements[i];
    const templateEl = templateElements[i];

    if (templateEl[0] === paramIdentifier) {
      if (!pathElRegExp.test(pathEl)) return false;
    } else if (pathEl !== templateEl) return false;
  }

  return true;
};

export const checkAccess = (pathname: string, userRole: AccessRole) => {
  let responsePath: string = pathname;
  let responseType: "next" | "redirect" = "next";

  for (const route of routes) {
    const { path, access } = route;

    if (checkPath(pathname, path)) {
      if (!access || access.includes(userRole)) break;
      else {
        if (access.length === 1 && access[0] === ACCESS.admin) break;
        else if (userRole === ACCESS.unauthorized) {
          responsePath = pages.login.path;
          responseType = "redirect";
        } else if (
          pathname === pages.hrSurvey.path ||
          pathname === pages.psychologistSurvey.path
        ) {
          responsePath = pages.cabinet.path;
          responseType = "redirect";
        } else if (access.length === 1 && access[0] === ACCESS.unauthorized) {
          responsePath = pages.main.path;
          responseType = "redirect";
        }
      }
      break;
    }
  }

  return {
    path: responsePath,
    operationType: responseType,
  };
};
