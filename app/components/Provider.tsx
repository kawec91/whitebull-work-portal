"use client";

import { SessionData } from "@/types";
import { SessionProvider } from "next-auth/react";

export default function Provider(
  {
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>,
  session: SessionData | null
) {
  return <SessionProvider session={session}>{children}</SessionProvider>;
}
