import { NextResponse } from "next/server";
import { mapGetHelpCategoriesResponse } from "@/server/mappers";
import { createRequest } from "@/server/utils";
import { type GetHelpCategoriesApiResponseData } from "@/shared/types";

const getHelpCategories = createRequest(async (request, serverFetch) => {
  const { data } = await serverFetch.get<GetHelpCategoriesApiResponseData>(
    "/mood_tracker/help-categories",
  );

  return NextResponse.json(mapGetHelpCategoriesResponse(data));
});

export const HelpCategoriesRoutes = {
  GET: getHelpCategories,
};
