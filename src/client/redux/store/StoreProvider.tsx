"use client";

import { type FC, type ReactNode } from "react";
import { Provider } from "react-redux";
import { createStore } from "..";
import { type InitialState } from "@/shared/types";

interface Props {
  children: ReactNode;
  initialState: InitialState;
}

export const StoreProvider: FC<Props> = ({ children, initialState }) => {
  const store = createStore(initialState);

  return <Provider store={store}>{children}</Provider>;
};
