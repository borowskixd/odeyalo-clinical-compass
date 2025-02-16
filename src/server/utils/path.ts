import { type NextRequest } from "next/server";

export const addSearchParams = (url: string, request: NextRequest): string => {
  let params = "";

  for (const [key, value] of request.nextUrl.searchParams.entries()) {
    params += key + "=" + value + "&";
  }

  return `${url}?${params}`;
};
