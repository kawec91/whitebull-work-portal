import Image from "next/image";
import React from "react";
import docIcon from "../../public/assets/icons/doc.png";
import * as actions from "../actions/index";

interface UploadedDocumentCardProps {
  id: number;
  title: string;
  url: string;
  userEmail: string;
  showDeleteBtn: boolean;
}

export default function UploadedDocumentCard({
  id,
  title,
  url,
  userEmail,
  showDeleteBtn,
}: UploadedDocumentCardProps) {
  const handleClick = () => {
    actions.createAplication(userEmail);
  };
  const handleDelete = () => {
    actions.userDocumentDelete(id);
  };

  return (
    <div className="flex items-center justify-between w-full px-2">
      <div className="flex items-center">
        <Image src={docIcon} height={40} width={40} alt="dokument-image" />
        <span>{title}</span>
      </div>
      <div className="hidden">{url}</div>
      <div className="flex items-center justify-center gap-2">
        {/* <button className="text-blue-700">Zmień</button> */}
        {showDeleteBtn && (
          <button
            className="text-red-500"
            onClick={() => {
              handleDelete();
            }}
          >
            Usuń
          </button>
        )}
        {!showDeleteBtn && (
          <button
            onClick={() => {
              handleClick();
            }}
            className="font-bold bg-red-800 py-2 px-8 text-white rounded-md hover:bg-red-600"
          >
            Aplikuj
          </button>
        )}
      </div>
    </div>
  );
}
