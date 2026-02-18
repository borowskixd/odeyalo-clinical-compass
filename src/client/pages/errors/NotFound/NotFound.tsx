import { type FC } from "react";
import { Container, Header, PageTitle } from "@/client/components";

export const NotFoundPage: FC = () => {
  return (
    <>
      <Header />
      <main>
        <Container>
          <PageTitle>404 - страница не найдена</PageTitle>
        </Container>
      </main>
    </>
  );
};
