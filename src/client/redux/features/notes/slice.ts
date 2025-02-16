import { defaultInitialState, reducers } from "@/shared/data";
import { type NotesState } from "@/shared/types";
import { type PayloadAction, createSlice } from "@reduxjs/toolkit";

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
