import type { Metadata } from "next";
import { fontVariablesClass } from "@/client/assets/fonts";
import { ModalsPortal, SnackbarsPortal } from "@/client/components";
import { AuthLayer, StoreLayer } from "@/client/components/layers";
import "@/client/styles/global.scss";
import "@/client/styles/reset.scss";
import { AnalyticsProvider } from "@/shared/analytics";
import "@odeyalo/uikit/dist/main.css";
import "@odeyalo/uikit/styles/fonts.scss";
import "@odeyalo/uikit/styles/styles.scss";
import { type FC, type ReactNode } from "react";

export const metadata: Metadata = {
  title: "Одеяло",
  description:
    "Программная система для сопровождения психотерапии и самостоятельной проработки психологических проблем",
};

type RootLayoutProps = Readonly<{
  children: ReactNode;
  authorized: ReactNode;
  unauthorized: ReactNode;
}>;

const RootLayout: FC<RootLayoutProps> = async ({
  children,
  authorized,
  unauthorized,
}) => {
  return (
    <html lang="ru">
      <body className={fontVariablesClass}>
        <AnalyticsProvider>
          <StoreLayer>
            <AuthLayer
              authorized={authorized}
              unauthorized={unauthorized}
            >
              {children}
            </AuthLayer>
            <SnackbarsPortal />
            <ModalsPortal />
          </StoreLayer>
        </AnalyticsProvider>
      </body>
    </html>
  );
};

export default RootLayout;
