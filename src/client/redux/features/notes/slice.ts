import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { defaultInitialState, reducers } from "@/shared/data";
import { type NotesState } from "@/shared/types";

const initialState: NotesState = defaultInitialState.notesReducer;

const notesSlice = createSlice({
  name: reducers.notesReducer,
  initialState,
  reducers: {
    setNotesCalendarDate: (state, { payload }: PayloadAction<Date>) => {
      state.calendarDate = payload;
    },
  },
});

export const notesActions = notesSlice.actions;

export const notesReducer = notesSlice.reducer;
