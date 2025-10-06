import { type NextRequest, type NextResponse } from "next/server";
import { cookies, deleteCookieParams } from "@/shared/data";

export const setAuthCookies = (
  response: NextResponse,
  tokens: {
    accessToken: string;
    refreshToken: string;
  },
): NextResponse => {
  response.cookies.set(
    cookies.accessToken.name,
    tokens.accessToken,
    cookies.accessToken.params,
  );

  response.cookies.set(
    cookies.refreshToken.name,
    tokens.refreshToken,
    cookies.refreshToken.params,
  );

  return response;
};

export const deleteAuthCookies = (response: NextResponse): NextResponse => {
  response.cookies.set(cookies.accessToken.name, "", deleteCookieParams);
  response.cookies.set(cookies.refreshToken.name, "", deleteCookieParams);

  return response;
};

export const getRequestTokens = (
  request: NextRequest,
): {
  accessToken: string | undefined;
  refreshToken: string | undefined;
} => {
  const accessToken = request.cookies.get(cookies.accessToken.name)?.value;
  const refreshToken = request.cookies.get(cookies.refreshToken.name)?.value;

  return {
    accessToken,
    refreshToken,
  };
};
