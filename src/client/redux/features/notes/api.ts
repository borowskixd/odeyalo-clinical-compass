import { api } from "../../api";
import {
  type CreateNoteRequestData,
  type GetEmojisResponseData,
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
        query: (id) => `/exercises/notes/${id}`,
        providesTags: ["Auth"],
      }),
      getNotesByDate: builder.query<GetNotesResponseData, Date>({
        query: (date) => {
          const dateString = mapDateToApiDateFormat(date);
          return `/exercises/notes?date=${dateString}`;
        },
        providesTags: ["Auth", "Notes"],
      }),
      getNotesCalendarFilledDates: builder.query<
        GetNotesCalendarFilledDatesResponseData,
        void
      >({
        query: () => "/exercises/notes/calendar",
        providesTags: ["Auth", "Notes", "Moods"],
      }),
      createNote: builder.mutation<ResponseSuccessInfo, CreateNoteRequestData>({
        query: (body) => ({
          url: "/exercises/notes",
          method: "POST",
          body,
        }),
        invalidatesTags: ["Notes"],
      }),
      getMood: builder.query<GetMoodResponseData, string>({
        query: (id) => `/exercises/moods/${id}`,
        providesTags: ["Auth"],
      }),
      getMoods: builder.query<GetMoodsResponseData, Date | void>({
        query: (date?: Date) => {
          if (date) {
            const dateString = mapDateToApiDateFormat(date);
            return `/exercises/moods?date=${dateString}`;
          }
          return "/exercises/moods";
        },
        providesTags: ["Auth", "Moods"],
      }),
      getEmojis: builder.query<GetEmojisResponseData, void>({
        query: () => {
          return `/exercises/moods/emojis`;
        },
        providesTags: [],
      }),
      saveMood: builder.mutation<ResponseSuccessInfo, SaveMoodRequestData>({
        query: (body: SaveMoodRequestData) => ({
          url: "/exercises/moods",
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
  useGetEmojisQuery,
  useGetMoodsQuery,
  useSaveMoodMutation,
} = notesApi;
