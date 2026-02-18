"use client";

import { usePathname, useRouter } from "next/navigation";
import { type FC, type ReactNode, useEffect } from "react";
import { useAppSelector } from "@/client/hooks";
import { selectIsAuth, selectRole } from "@/client/redux";
import { checkAccess } from "@/shared/utils";

interface AuthLayoutProps {
  children: ReactNode;
  authorized: ReactNode;
  unauthorized: ReactNode;
}

export const AuthLayer: FC<AuthLayoutProps> = ({
  children,
  authorized,
  unauthorized,
}) => {
  const userRole = useAppSelector(selectRole);
  const isAuth = useAppSelector(selectIsAuth);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const { path, operationType } = checkAccess(pathname, userRole);

    if (operationType === "redirect") {
      router.push(path);
    }
  }, [pathname, userRole, router]);

  if (isAuth && authorized) return authorized;
  if (!isAuth && unauthorized) return unauthorized;

  return children;
};
