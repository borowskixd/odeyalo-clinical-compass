import type {
  GetMoodsApiResponseData,
  GetNotesApiResponseData,
  GetNotesCalendarFilledDatesResponseData,
} from "@/shared/types";
import { mapDateToApiDateFormat } from "@/shared/utils";

export const mapGetNotesCalendarFilledDatesResponse = (
  notesData: GetNotesApiResponseData,
  moodTrackerData: GetMoodsApiResponseData,
): GetNotesCalendarFilledDatesResponseData => {
  const calendarData: GetNotesCalendarFilledDatesResponseData = [];

  const skipDays = new Set<string>();

  for (const note of notesData) {
    const noteDate = new Date(note.created_at);
    const noteDateStr = mapDateToApiDateFormat(noteDate);

    if (skipDays.has(noteDateStr)) continue;
    calendarData.push(noteDateStr);
    skipDays.add(noteDateStr);
  }

  for (const moodTracker of moodTrackerData) {
    const moodTrackerDate = new Date(moodTracker.created_at);
    const moodTrackerDateStr = mapDateToApiDateFormat(moodTrackerDate);

    if (skipDays.has(mapDateToApiDateFormat(moodTrackerDate))) continue;
    calendarData.push(moodTrackerDateStr);
    skipDays.add(mapDateToApiDateFormat(moodTrackerDate));
  }

  return calendarData;
};
