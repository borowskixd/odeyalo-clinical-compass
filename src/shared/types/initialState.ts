import { ReactNode } from "react";
import { type AccessRole } from "../config/access";

export interface PopupsState {
  snackbar: {
    isOpen: boolean;
    label: string;
  };
}

export interface UserAgent {
  ua: string;
  browser: {
    name?: string;
    version?: string;
    major?: string;
  };
  device: {
    model?: string;
    type?: string;
    vendor?: string;
  };
  os: {
    name?: string;
    version?: string;
  };
}

export interface AuthState {
  isAuth: boolean;
  profile: {
    id: string;
    role: AccessRole;
    email: string;
    username: string;
  };
  ua: UserAgent;
}

export interface NotesState {
  calendarDate: Date | null;
}

export interface Message {
  message: ReactNode;
  author: "user" | "bot";
}

export interface ChatBotState {
  messages: Message[];
  hideMessages: boolean;
}

export interface InitialState {
  authReducer: AuthState;
  popupsReducer: PopupsState;
  notesReducer: NotesState;
  chatBotReducer: ChatBotState;
}

export type ReducersNames = Record<keyof InitialState, string>;
