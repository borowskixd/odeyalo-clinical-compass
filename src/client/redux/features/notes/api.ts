import { api } from "../../api";
import {
  type CreateNoteRequestData,
  type GetMoodResponseData,
  type GetMoodsResponseData,
  type GetNoteResponseData,
  type GetNotesCalendarFilledDatesResponseData,
  type GetNotesResponseData,
  type ResponseSuccessInfo,
  type SaveMoodRequestData,
} from "@/shared/types";
import { mapDateToApiDateFormat } from "@/shared/utils";

const notesApi = api.injectEndpoints({
  endpoints: (builder) => {
    return {
      getNote: builder.query<GetNoteResponseData, string>({
        query: (id) => `/notes/${id}`,
        providesTags: ["Auth"],
      }),
      getNotesByDate: builder.query<GetNotesResponseData, Date>({
        query: (date) => {
          const dateString = mapDateToApiDateFormat(date);
          return `/notes?date=${dateString}`;
        },
        providesTags: ["Auth", "Notes"],
      }),
      getNotesCalendarFilledDates: builder.query<
        GetNotesCalendarFilledDatesResponseData,
        void
      >({
        query: () => "/notes/calendar",
        providesTags: ["Auth", "Notes", "Moods"],
      }),
      createNote: builder.mutation<ResponseSuccessInfo, CreateNoteRequestData>({
        query: (body) => ({
          url: "/notes",
          method: "POST",
          body,
        }),
        invalidatesTags: ["Notes"],
      }),
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
        providesTags: ["Auth", "Moods"],
      }),
      saveMood: builder.mutation<ResponseSuccessInfo, SaveMoodRequestData>({
        query: (body: SaveMoodRequestData) => ({
          url: "/moods",
          method: "POST",
          body,
        }),
        invalidatesTags: ["Moods"],
      }),
    };
  },
});

export const {
  useGetNoteQuery,
  useGetNotesByDateQuery,
  useCreateNoteMutation,
  useGetNotesCalendarFilledDatesQuery,
  useGetMoodQuery,
  useGetMoodsQuery,
  useSaveMoodMutation,
} = notesApi;
