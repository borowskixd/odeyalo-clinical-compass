import { api } from "../../api";
import {
  type GetMoodResponseData,
  type GetMoodsResponseData,
  type ResponseSuccessInfo,
  type SaveMoodRequestData,
} from "@/shared/types";
import { mapDateToApiDateFormat } from "@/shared/utils";

const notesApi = api.injectEndpoints({
  endpoints: (builder) => {
    return {
      getMood: builder.query<GetMoodResponseData, string>({
        query: (id) => `/moods/${id}`,
        providesTags: ["Auth"],
      }),
      getMoods: builder.query<GetMoodsResponseData, Date | void>({
        query: (date?: Date) => {
          if (date) {
            const dateString = mapDateToApiDateFormat(date);
            return `/moods?date=${dateString}`;
          }
          return "/moods";
        },
        providesTags: ["Auth"],
      }),
      saveMood: builder.mutation<ResponseSuccessInfo, SaveMoodRequestData>({
        query: (body: SaveMoodRequestData) => ({
          url: "/moods",
          method: "POST",
          body,
        }),
        invalidatesTags: ["Auth", "Moods"],
      }),
    };
  },
});

export const { useGetMoodQuery, useGetMoodsQuery, useSaveMoodMutation } =
  notesApi;
