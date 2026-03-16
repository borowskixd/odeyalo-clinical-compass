import {
  combineReducers,
  configureStore,
  type Store,
  type ThunkDispatch,
  type UnknownAction,
} from "@reduxjs/toolkit";
import { api } from "../api";
import {
  authReducer,
  chatBotReducer,
  notesReducer,
  popupsReducer,
} from "../features";
import { type InitialState } from "@/shared/types";

const rootReducer = combineReducers({
  [api.reducerPath]: api.reducer,
  authReducer,
  popupsReducer,
  notesReducer,
  chatBotReducer,
});

export const createStore = (initialState: InitialState): Store => {
  return configureStore({
    reducer: rootReducer,
    preloadedState: initialState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }).concat(api.middleware),
    devTools: true,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = ThunkDispatch<RootState, any, UnknownAction>;
