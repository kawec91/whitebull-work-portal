"use client";

import { UserData } from "@/types";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";

interface AdminPanelEntranceProps {
  adminList: UserData[];
}

export default function AdminPanelEntrance({
  adminList,
}: AdminPanelEntranceProps) {
  const { data: session } = useSession();
  const [isAdmin, setAdmin] = useState(false);
  console.log("adminini", isAdmin);
  console.log("adminlist", adminList);
  useEffect(() => {
    for (let i = 0; i < adminList.length; i++) {
      if (
        adminList[i].role === "admin" &&
        adminList[i].email === session?.user?.email
      ) {
        console.log("admin2");
        setAdmin(true);
      }
    }
    console.log("use Effectg");
  }, [adminList, session?.user?.email]);
  return (
    <div>
      {isAdmin ? (
        <Link href={"/admin"} className="text-black">
          Panel Administracyjny
        </Link>
      ) : (
        <></>
      )}
    </div>
  );
}
