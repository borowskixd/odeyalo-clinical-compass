"use client";

import { UnexpectedPage } from "@/client/pages";
import { type FC } from "react";

interface GlobalErrorPageProps {
  reset: () => void;
}

const GlobalErrorPage: FC<GlobalErrorPageProps> = ({ reset }) => {
  return (
    <html>
      <body>
        <UnexpectedPage reset={reset} />
      </body>
    </html>
  );
};

export default GlobalErrorPage;
