import { type ReactNode } from "react";
import { Footer, Header } from "@/client/components";

export default function AuthentificationLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
