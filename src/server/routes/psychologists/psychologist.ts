import { NextResponse } from "next/server";
import { mapGetPsychologistResponse } from "@/server/mappers";
import { createRequest } from "@/server/utils";
import { httpStatuses } from "@/shared/data";
import {
  type GetPsychologistApiResponseData,
  type GetPsychologistResponseData,
} from "@/shared/types";

const getPsychologist = createRequest<{ id: string }>(
  async (request, serverFetch, { id }) => {
    const response = await serverFetch.get<GetPsychologistApiResponseData>(
      `/psychologist/${id}`,
    );

    const data: GetPsychologistResponseData = mapGetPsychologistResponse(
      response.data,
    );

    return NextResponse.json(data, httpStatuses.ok);
  },
);

export const PsychologistRoutes = {
  GET: getPsychologist,
};
