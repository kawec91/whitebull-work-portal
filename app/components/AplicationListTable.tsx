"use client";

import { AplicationData } from "@prisma/client";
import Image from "next/image";
import React from "react";
import * as actions from "../actions/index";

interface AplicationListTableProps {
  aplicationList: AplicationData[];
}

export default function AplicationListTable({
  aplicationList,
}: AplicationListTableProps) {
  const handleDeleteClick = (id: number) => {
    actions.aplicationDelete(id);
  };
  return (
    <div>
      {aplicationList.map((item) => (
        <div
          className="flex items-center justify-between border-b-[1px] border-black p-4"
          key={`${item.userEmail}-admin-aplication`}
        >
          <div className="flex items-center gap-4">
            <Image
              src={item.userProfileImageUrl ? item.userProfileImageUrl : ""}
              alt="user profile image"
              width={48}
              height={48}
              className="object-contain rounded-full"
            />
            <div className="text-xl">{item.userEmail}</div>
          </div>
          <div className="flex items-center justify-center gap-4">
            <button className="cursor-pointer text-green-600">Etap 2</button>
            <p>|</p>
            <button
              className="cursor-pointer text-red-600"
              onClick={() => {
                handleDeleteClick(item.id);
              }}
            >
              Usuń
            </button>
          </div>
          <button className="flex items-center justify-center gap-2 bg-red-400 px-4 py-2 rounded-full hover:bg-white hover:border-black hover:border-[1px]">
            <Image
              src={"/assets/icons/download.png"}
              alt="download icon"
              width={32}
              height={32}
            />
            <p className="font-bold uppercase">Pobierz CV</p>
          </button>
        </div>
      ))}
    </div>
  );
}
