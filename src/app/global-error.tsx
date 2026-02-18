"use client";

import { type FC } from "react";
import { UnexpectedPage } from "@/client/pages";

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
