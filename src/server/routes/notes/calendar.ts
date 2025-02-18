import { NextResponse } from "next/server";
import { GetNotesCalendarFilledDatesResponse } from "@/server/mappers";
import { createRequest } from "@/server/utils";
import {
  type GetMoodsApiResponseData,
  type GetNotesApiResponseData,
} from "@/shared/types";

const getNotesCalendarFilledDates = createRequest(
  async (request, serverFetch) => {
    const notesPromise = serverFetch.get<GetNotesApiResponseData>(
      "/diary/reading_free_diary",
    );
    const moodTrackerPromise = serverFetch.get<GetMoodsApiResponseData>(
      "/mood_tracker/get_all_mood_tracker",
    );

    const [notesRequest, moodTrackerRequest] = await Promise.all([
      notesPromise,
      moodTrackerPromise,
    ]);

    return NextResponse.json(
      GetNotesCalendarFilledDatesResponse(
        notesRequest.data,
        moodTrackerRequest.data,
      ),
    );
  },
);

export const NotesCalendarRoutes = {
  GET: getNotesCalendarFilledDates,
};
