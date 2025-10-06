import { type ReadonlyHeaders } from "next/dist/server/web/spec-extension/adapters/headers";
import { type ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { userAgent } from "next/server";
import { ACCESS } from "@/shared/config/access";
import { bffAxios } from "@/shared/config/api";
import { cookies as cookiesData, defaultInitialState } from "@/shared/data";
import { type GetMeResponseData, type InitialState } from "@/shared/types";
import { parseAccessJWT } from "@/shared/utils";

export const getAuthReducer = async (
  headers: ReadonlyHeaders,
  cookies: ReadonlyRequestCookies,
) => {
  const ua = userAgent({ headers });

  try {
    const accessToken = cookies.get(cookiesData.accessToken.name)?.value;
    const tokenData = parseAccessJWT(accessToken);
    const userRole = tokenData ? tokenData.payload.role : ACCESS.unauthorized;

    const meResponse = await bffAxios.get<GetMeResponseData>("/auth/me", {
      headers: {
        "Cookie": cookies.toString(),
      },
    });

    const { id, email, username } = meResponse.data;
    const authReducer: InitialState["authReducer"] = {
      isAuth: true,
      profile: {
        id,
        email,
        username,
        role: userRole,
      },
      ua,
    };

    return authReducer;
  } catch {
    return {
      ...defaultInitialState["authReducer"],
      ua,
    };
  }
};
