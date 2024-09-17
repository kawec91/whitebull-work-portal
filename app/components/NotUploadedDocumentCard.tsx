"use client";
import Image from "next/image";
import React, { useState } from "react";
import addPlus from "../../public/assets/icons/add-plus.svg";

interface NotUploadedDocumentCardProps {
  type: string;
  checkBoxInfo: string;
  infoText: string;
}

export default function NotUploadedDocumentCard({
  type,
  checkBoxInfo,
  infoText,
}: NotUploadedDocumentCardProps) {
  const [isFileChoosen, setIsFileChoosen] = useState(false);
  const [formData, setFormData] = useState({
    document: "",
    documentType: "",
  });
  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setIsFileChoosen((prev) => !prev);
    console.log("tatata", formData);
  };

  const inputCheckboxHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <form
      action={"/api/profile/docs/new"}
      method="POST"
      encType="multipart/form-data"
      className="flex flex-col items-center justify-between w-full p-2  rounded-lg group hover:bg-green-900 border-[1px] border-green-900 cursor-pointer"
    >
      <div className="flex items-center justify-between gap-4">
        <Image
          src={addPlus}
          height={40}
          width={40}
          alt="plus"
          className="group-hover:bg-white z-10 rounded-full"
        />
        <input
          onChange={(e) => inputChangeHandler(e)}
          type="file"
          className="uppercase font-bold text-red-700 group-hover:text-white cursor-pointer"
          name="document"
          required
        />
      </div>
      <div>
        {isFileChoosen ? (
          <div className="flex items-center justify-center gap-2 m-2">
            <input
              type="checkbox"
              name="documentType"
              value={type}
              required
              onChange={(e) => inputCheckboxHandler(e)}
            />
            <div>
              <span>{checkBoxInfo}</span>
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
      <div>
        <span className="group-hover:text-white pt-2">
          {isFileChoosen ? (
            <button
              type="submit"
              className="animate-pulse font-bold bg-red-800 py-2 px-8 text-white rounded-md hover:bg-red-600"
            >
              Wyślij
            </button>
          ) : (
            <div>
              <span>{infoText}</span>
            </div>
          )}
        </span>
      </div>
    </form>
  );
}
