import { Footer, Header } from "@/client/components";
import { type ReactNode } from "react";

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
