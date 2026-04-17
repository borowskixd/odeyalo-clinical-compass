import { NextResponse } from "next/server";
import { createRequest } from "@/server/utils";
import { httpStatuses } from "@/shared/data";
import { type GetInquiriesResponseData } from "@/shared/types";

const getInquiries = createRequest(async (request, serverFetch) => {
  const response = await serverFetch.get<GetInquiriesResponseData>(
    "/psychologist/inquiry",
  );

  return NextResponse.json(response.data, httpStatuses.ok);
});

export const InquiriesRoutes = {
  GET: getInquiries,
};
