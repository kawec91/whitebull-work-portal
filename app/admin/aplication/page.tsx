import AplicationListTable from "@/app/components/AplicationListTable";
import { db } from "@/app/db";
import React from "react";
import { AplicationData } from "@prisma/client";

const Aplication = async () => {
  const dataFromDb: AplicationData[] = await db.aplicationData.findMany();
  return (
    <div className="flex flex-col gap-4 ">
      <AplicationListTable aplicationList={dataFromDb} />
    </div>
  );
};

export default Aplication;
