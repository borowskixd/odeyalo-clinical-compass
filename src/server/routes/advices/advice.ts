import { NextResponse } from "next/server";
import { mapGetHelpCategoryByIdResponse } from "@/server/mappers";
import { createRequest } from "@/server/utils";
import { type GetHelpCategoryByIdApiResponseData } from "@/shared/types";

const getHelpCategoryById = createRequest<{ id: string }>(
  async (request, serverFetch, { id }) => {
    const { data } = await serverFetch.get<GetHelpCategoryByIdApiResponseData>(
      `/mood_tracker/help-categories/${id}`,
    );

    return NextResponse.json(mapGetHelpCategoryByIdResponse(data));
  },
);

export const HelpCategoryByIdRoutes = {
  GET: getHelpCategoryById,
};
