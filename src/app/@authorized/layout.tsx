import { Header } from "@/client/components";
import { type ReactNode } from "react";

export default function AuthorizedLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  );
}
