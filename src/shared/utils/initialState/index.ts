import { type ReadonlyHeaders } from "next/dist/server/web/spec-extension/adapters/headers";
import { type ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { getAuthReducer } from "./getAuthReducer";
import { defaultInitialState } from "@/shared/data";
import { type InitialState } from "@/shared/types";

export const getInitialState = async (
  headers: ReadonlyHeaders,
  cookies: ReadonlyRequestCookies,
): Promise<InitialState> => {
  const authReducer = await getAuthReducer(headers, cookies);

  return {
    ...defaultInitialState,
    authReducer,
  };
};
