import type { RootState } from "@/client/redux";

const selectChatBotModule = (state: RootState) => {
  return state.chatBotReducer;
};

export const selectChatBotMessages = (state: RootState) => {
  return selectChatBotModule(state).messages;
};

export const selectChatBotHideMessages = (state: RootState) => {
  return selectChatBotModule(state).hideMessages;
};
