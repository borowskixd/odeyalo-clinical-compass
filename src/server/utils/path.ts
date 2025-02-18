import { type NextRequest } from "next/server";

export const addSearchParams = (
  url: string,
  request: NextRequest,
  searchParams?: string | string[],
): string => {
  let params = "";

  if (typeof searchParams === "string") {
    const searchParamValue = request.nextUrl.searchParams.get(searchParams);
    if (searchParamValue) params += searchParams + "=" + searchParamValue + "&";
  } else if (Array.isArray(searchParams)) {
    for (const searchParam of searchParams) {
      const searchParamValue = request.nextUrl.searchParams.get(searchParam);
      if (searchParamValue)
        params += searchParam + "=" + searchParamValue + "&";
    }
  } else {
    for (const [key, value] of request.nextUrl.searchParams.entries()) {
      params += key + "=" + value + "&";
    }
  }

  return `${url}?${params}`;
};
