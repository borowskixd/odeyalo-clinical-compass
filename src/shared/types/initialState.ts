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

export type MoodInfluenceFactorDraft = {
  categoryId: string;
  optionIds: string[];
  customText: string;
};

export type MoodDraft = {
  score: number;
  emotions: string[];
  otherEmotion: string;
  influenceFactors: MoodInfluenceFactorDraft[];
};

export interface NotesState {
  calendarDate: Date | null;
  moodTracker: { mood: number; emojis: number[] };
  moodDraft: MoodDraft;
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
