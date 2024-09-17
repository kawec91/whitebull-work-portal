import AplicationListTable from "@/app/components/AplicationListTable";
import { db } from "@/app/db";
import Image from "next/image";
import React from "react";
import { AplicationData } from "@prisma/client";

const Aplication = async () => {
  const data = [
    {
      userId: "1",
      profileImage:
        "https://lh3.googleusercontent.com/a/ACg8ocJA_QTA83d8q0XzTST-0TU7F6LeYg1Bn-2eo6pqYGmvAMI_k2UB=s96-c",
      fullName: "Lukasz Lukawczyk",
      cvFile: "",
    },
    {
      userId: "2",
      profileImage:
        "https://lh3.googleusercontent.com/a/ACg8ocJA_QTA83d8q0XzTST-0TU7F6LeYg1Bn-2eo6pqYGmvAMI_k2UB=s96-c",
      fullName: "Jan Kowalski",
      cvFile: "",
    },
  ];
  const dataFromDb: AplicationData[] = await db.aplicationData.findMany();
  return (
    <div className="flex flex-col gap-4 ">
      <AplicationListTable aplicationList={dataFromDb} />
    </div>
  );
};

export default Aplication;
