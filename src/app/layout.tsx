import type { Metadata } from "next";
import { type FC, type ReactNode } from "react";
import "@/client/styles/global.scss";
import "@odeyalo/uikit/styles.css";
import { fontVariablesClass } from "@/client/assets/fonts";
import { SnackbarsPortal } from "@/client/components";
import { AuthLayer, StoreLayer } from "@/client/components/layers";
import { AnalyticsProvider } from "@/shared/analytics";

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
          </StoreLayer>
        </AnalyticsProvider>
      </body>
    </html>
  );
};

export default RootLayout;
