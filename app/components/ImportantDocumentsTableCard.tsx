"use client";

import React from "react";
import docIcon from "../../public/assets/icons/doc.png";
import Image from "next/image";
import * as actions from "../actions/index";

interface ImportantDocumentsTableCardProps {
  title: string;
  url: string;
  id: number;
}

export default function ImportantDocumentsTableCard({
  title,
  url,
  id,
}: ImportantDocumentsTableCardProps) {
  const handleDelete = (id: number) => {
    actions.importantDocumentDelete(id);
  };
  return (
    <div className="flex items-center justify-between w-full px-2">
      <div className="flex items-center">
        <Image src={docIcon} height={40} width={40} alt="dokument-image" />
        <p>{title}</p>
      </div>
      <div className="hidden">{url}</div>
      <div className="flex items-center justify-center gap-2">
        {/* <button className="text-blue-700">Zmień</button> */}
        <button
          className="text-red-500"
          onClick={() => {
            handleDelete(id);
          }}
        >
          Usuń
        </button>
      </div>
    </div>
  );
}
