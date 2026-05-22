import { ACCESS } from "../config/access";
import { type InitialState, type ReducersNames } from "../types";

export const reducers: ReducersNames = {
  authReducer: "auth",
  popupsReducer: "popups",
  notesReducer: "notes",
  chatBotReducer: "notes",
};

export const defaultInitialState: InitialState = {
  authReducer: {
    isAuth: false,
    profile: {
      id: "",
      email: "",
      username: "",
      role: ACCESS.unauthorized,
    },
    ua: {
      ua: "",
      browser: {},
      device: {},
      os: {},
    },
  },
  popupsReducer: {
    snackbar: {
      isOpen: false,
      label: "",
    },
  },
  notesReducer: {
    calendarDate: null,
    moodTracker: {
      mood: 50,
      emojis: [],
    },
  },
  chatBotReducer: {
    messages: [],
    hideMessages: false,
  },
};
