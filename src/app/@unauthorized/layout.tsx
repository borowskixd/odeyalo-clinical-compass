import { type ReactNode } from "react";

export default function UnauthorizedLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return children;
}
