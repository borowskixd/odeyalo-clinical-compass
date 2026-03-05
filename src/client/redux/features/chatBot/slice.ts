import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { defaultInitialState, reducers } from "@/shared/data";
import { type ChatBotState, Message } from "@/shared/types";

const initialState: ChatBotState = defaultInitialState.chatBotReducer;

const chatBotSlice = createSlice({
  name: reducers.chatBotReducer,
  initialState,
  reducers: {
    addMessage: (state, { payload }: PayloadAction<Message>) => {
      state.messages.push(payload);
    },

    hideMessages: (state) => {
      state.hideMessages = true;
    },

    showMessages: (state) => {
      state.hideMessages = false;
    },
  },
});

export const chatBotActions = chatBotSlice.actions;

export const chatBotReducer = chatBotSlice.reducer;
