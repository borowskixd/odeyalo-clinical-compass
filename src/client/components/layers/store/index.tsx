import { cookies, headers } from "next/headers";
import { type FC, type ReactNode } from "react";
import { StoreProvider } from "@/client/redux";
import { getInitialState } from "@/shared/utils";

interface StoreLayoutProps {
  children: ReactNode;
}

export const StoreLayer: FC<StoreLayoutProps> = async ({ children }) => {
  const [headersList, cookiesStore] = await Promise.all([headers(), cookies()]);
  const initialState = await getInitialState(headersList, cookiesStore);

  return <StoreProvider initialState={initialState}>{children}</StoreProvider>;
};
