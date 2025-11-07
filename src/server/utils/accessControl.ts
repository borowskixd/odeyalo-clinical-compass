import { type NextRequest, NextResponse } from "next/server";
import { deleteAuthCookies, setAuthCookies } from "@/server/utils/cookies";
import { ACCESS } from "@/shared/config/access";
import { serverAxios } from "@/shared/config/api";
import { cookies } from "@/shared/data";
import { checkAccess, parseAccessJWT } from "@/shared/utils";

export const checkAuth = async (
  request: NextRequest,
): Promise<NextResponse> => {
  const accessToken = request.cookies.get(cookies.accessToken.name)?.value;
  const refreshToken = request.cookies.get(cookies.refreshToken.name)?.value;

  const tokenData = parseAccessJWT(accessToken ?? refreshToken);
  const userRole = tokenData ? tokenData.payload.role : ACCESS.unauthorized;

  const { pathname } = request.nextUrl;

  let response: NextResponse;

  const { path, operationType } = checkAccess(pathname, userRole);

  const needToUpdateAccessToken = !accessToken && !!refreshToken;
  let refreshTokenData = null;

  if (needToUpdateAccessToken) {
    try {
      const refreshTokenResponse = await serverAxios.post(
        "/auth/refresh-token",
        {
          refresh_token: refreshToken,
        },
      );

      refreshTokenData = refreshTokenResponse.data;
    } catch {
      refreshTokenData = null;
    }
  }

  console.log(needToUpdateAccessToken, refreshTokenData);

  switch (operationType) {
    case "next": {
      if (refreshTokenData === null) {
        if (needToUpdateAccessToken) {
          response = deleteAuthCookies(NextResponse.next());
        } else {
          response = NextResponse.next();
        }
      } else {
        response = setAuthCookies(NextResponse.next(), {
          accessToken: refreshTokenData.access_token,
          refreshToken: refreshTokenData.refresh_token,
        });
      }
      break;
    }
    case "redirect": {
      if (refreshTokenData === null) {
        if (needToUpdateAccessToken) {
          response = deleteAuthCookies(
            NextResponse.redirect(new URL(path, request.url)),
          );
        } else {
          response = NextResponse.redirect(new URL(path, request.url));
        }
      } else {
        response = setAuthCookies(
          NextResponse.redirect(new URL(path, request.url)),
          {
            accessToken: refreshTokenData.access_token,
            refreshToken: refreshTokenData.refresh_token,
          },
        );
      }
      break;
    }
  }

  return response;
};
