import { type NextRequest, NextResponse } from "next/server";
import { deleteAuthCookies, setAuthCookies } from "@/server/utils/cookies";
import { ACCESS } from "@/shared/config/access";
import { bffAxios, serverAxios } from "@/shared/config/api";
import { cookies } from "@/shared/data";
import type {
  GetMeResponseData,
  YandexCallbackApiResponseData,
} from "@/shared/types";
import { checkAccess, parseAccessJWT } from "@/shared/utils";

export const checkAuth = async (
  request: NextRequest,
): Promise<NextResponse> => {
  const searchParams = request.nextUrl.searchParams;
  if (searchParams.has("code")) {
    const code = searchParams.get("code");
    try {
      const { data } = await serverAxios.get<YandexCallbackApiResponseData>(
        "/yandex/callback/code",
        {
          params: {
            code: code,
          },
        },
      );
      return setAuthCookies(NextResponse.next(), {
        accessToken: data?.access_token,
        refreshToken: data?.refresh_token,
      });
    } catch {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }
  }

  const accessToken = request.cookies.get(cookies.accessToken.name)?.value;
  const refreshToken = request.cookies.get(cookies.refreshToken.name)?.value;

  const tokenData = parseAccessJWT(accessToken ?? refreshToken);
  const userRole = tokenData ? tokenData.payload.role : ACCESS.unauthorized;

  let needToUpdateAccessToken = !tokenData && !!refreshToken;

  try {
    const { data } = await bffAxios.get<GetMeResponseData>("/users/me", {
      headers: {
        "Cookie": cookies.toString(),
      },
    });

    if (data.id !== tokenData?.payload.userId) {
      needToUpdateAccessToken = true;
    }
  } catch {
    needToUpdateAccessToken = true;
  }

  const { pathname } = request.nextUrl;

  let response: NextResponse;

  const { path, operationType } = checkAccess(pathname, userRole);

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
