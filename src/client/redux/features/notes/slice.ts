import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { defaultInitialState, reducers } from "@/shared/data";
import {
  type MoodDraft,
  type MoodInfluenceFactorDraft,
  type NotesState,
} from "@/shared/types";

const initialState: NotesState = defaultInitialState.notesReducer;

const notesSlice = createSlice({
  name: reducers.notesReducer,
  initialState,
  reducers: {
    setNotesCalendarDate: (state, { payload }: PayloadAction<Date>) => {
      state.calendarDate = payload;
    },
    setMoodTrackerValue: (state, { payload }: PayloadAction<number>) => {
      state.moodTracker.mood = payload;
    },
    setMoodTrackerEmojis: (state, { payload }: PayloadAction<number[]>) => {
      state.moodTracker.emojis = payload;
    },
    setMoodDraftScore: (state, { payload }: PayloadAction<number>) => {
      state.moodDraft.score = payload;
    },
    setMoodDraftEmotions: (state, { payload }: PayloadAction<string[]>) => {
      state.moodDraft.emotions = payload;
    },
    setMoodDraftOtherEmotion: (state, { payload }: PayloadAction<string>) => {
      state.moodDraft.otherEmotion = payload;
    },
    setMoodDraftInfluenceFactors: (
      state,
      { payload }: PayloadAction<MoodInfluenceFactorDraft[]>,
    ) => {
      state.moodDraft.influenceFactors = payload;
    },
    resetMoodDraft: (state) => {
      state.moodDraft = defaultInitialState.notesReducer.moodDraft as MoodDraft;
    },
  },
});

export const notesActions = notesSlice.actions;

export const notesReducer = notesSlice.reducer;
