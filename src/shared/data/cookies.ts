import { type ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";

interface Cookie {
  name: string;
  params?: Partial<ResponseCookie>;
}

interface Cookies {
  accessToken: Cookie;
  refreshToken: Cookie;
}

export const cookies: Cookies = {
  accessToken: {
    name: "access_token",
    params: {
      httpOnly: true,
      maxAge: 60 * 30,
    },
  },
  refreshToken: {
    name: "refresh_token",
    params: {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 30,
    },
  },
};

export const deleteCookieParams: Partial<ResponseCookie> = {
  maxAge: -1,
  path: "/",
};
