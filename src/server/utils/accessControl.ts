import { type NextRequest, NextResponse } from "next/server";
import { ACCESS } from "@/shared/config/access";
import { cookies } from "@/shared/data";
import { checkAccess, parseAccessJWT } from "@/shared/utils";

export const checkAuth = async (
  request: NextRequest,
): Promise<NextResponse> => {
  const accessToken = request.cookies.get(cookies.accessToken.name)?.value;

  const tokenData = parseAccessJWT(accessToken);
  const userRole = tokenData ? tokenData.payload.role : ACCESS.unauthorized;

  const { pathname } = request.nextUrl;

  let response: NextResponse;

  const { path, operationType } = checkAccess(pathname, userRole);

  switch (operationType) {
    case "next": {
      response = NextResponse.next();
      break;
    }
    case "redirect": {
      response = NextResponse.redirect(new URL(path, request.url));
      break;
    }
  }

  return response;
};
