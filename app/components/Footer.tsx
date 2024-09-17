import React from "react";
import { db } from "../db";
import AdminPanelEntrance from "./AdminPanelEntrance";
import { UserData } from "@/types";

export default async function Footer() {
  const adminsData: UserData[] = await db.user.findMany({
    where: {
      role: "admin",
    },
  });
  return (
    <div className="h-[50px] flex items-center justify-between px-4 border-t-[1px] border-black">
      <div>&copy; 2024 WhiteBull. All rights reserved.</div>
      <div>
        <AdminPanelEntrance adminList={adminsData} />
      </div>
    </div>
  );
}
