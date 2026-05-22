import type { RootState } from "@/client/redux";

const currentDate = new Date();

const selectNotesModule = (state: RootState) => {
  return state.notesReducer;
};

export const selectNotesCalendarDate = (state: RootState) => {
  return selectNotesModule(state).calendarDate ?? currentDate;
};

export const selectMoodTracker = (state: RootState) => {
  return selectNotesModule(state).moodTracker;
};
