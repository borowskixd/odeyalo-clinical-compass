import type { RootState } from "@/client/redux";

const selectNotesModule = (state: RootState) => {
  return state.notesReducer;
};

export const selectNotesCalendarDate = (state: RootState) => {
  return selectNotesModule(state).calendarDate;
};
