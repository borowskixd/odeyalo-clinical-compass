import { Container, Header, PageTitle } from "@/client/components";
import { type FC } from "react";

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
