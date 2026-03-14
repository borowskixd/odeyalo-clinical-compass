import { NextResponse } from "next/server";
import { createRequest, setAuthCookies } from "@/server/utils";
import { httpStatuses } from "@/shared/data";
import { type YandexAuthApiResponse } from "@/shared/types";

// Роут для редиректа на бэкенд (GET /api/yandex/login)
const yandexLogin = createRequest(async () => {
  try {
    const backendUrl = process.env.NEXT_PUBLIC_SERVER_API_URL;

    if (!backendUrl) {
      console.error("NEXT_PUBLIC_SERVER_API_URL is not defined");
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: httpStatuses.internalServerError.status },
      );
    }

    return NextResponse.redirect(`${backendUrl}/yandex/login`);
  } catch (error) {
    console.error("Yandex login redirect error:", error);
    return NextResponse.json(
      { error: "Service temporarily unavailable" },
      { status: httpStatuses.serviceUnavailable.status },
    );
  }
});

// Роут для обработки callback от Яндекса (GET /api/yandex/callback)
const yandexCallback = createRequest(async (request, serverFetch) => {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const error = url.searchParams.get("error");

  console.log("[Yandex Auth] Callback received", {
    code: code ? `${code.substring(0, 5)}...` : null,
    error,
  });

  if (error) {
    console.error("[Yandex Auth] OAuth error from Yandex:", error);
    return NextResponse.redirect(
      new URL(
        `/auth/login?error=yandex_auth_failed&reason=${error}`,
        request.url,
      ),
    );
  }

  if (!code) {
    console.error("[Yandex Auth] No code provided in callback");
    return NextResponse.redirect(
      new URL("/auth/login?error=no_code", request.url),
    );
  }

  try {
    const response = await serverFetch.get<YandexAuthApiResponse>(
      "/yandex/callback/code",
      { params: { code } },
    );

    if (
      !response.data ||
      !response.data.access_token ||
      !response.data.refresh_token
    ) {
      throw new Error("Invalid response from backend");
    }

    const { access_token, refresh_token } = response.data;

    console.log("[Yandex Auth] Tokens received successfully");

    const redirectResponse = NextResponse.redirect(new URL("/", request.url));

    return setAuthCookies(redirectResponse, {
      accessToken: access_token,
      refreshToken: refresh_token,
    });
  } catch (error) {
    console.error("[Yandex Auth] Callback processing error:", error);
    return NextResponse.redirect(
      new URL("/auth/login?error=yandex_auth_failed", request.url),
    );
  }
});

export const YandexRoutes = {
  GET: yandexLogin,
};

export const YandexCallbackRoutes = {
  GET: yandexCallback,
};
