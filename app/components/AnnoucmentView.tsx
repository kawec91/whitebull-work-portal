"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import walletIcon from "../../public/assets/icons/wallet.png";
import locationIcon from "../../public/assets/icons/location.png";

import AplicationCard from "./AplicationCard";
import { useSession } from "next-auth/react";

interface AnnoucmentViewProps {
  ann: {
    id: number;
    title: string;
    salary: string;
    image: string;
    video: string;
    description: string;
    location: string;
  };
  docsData: MyDocumentDataTableProps[];
}

interface MyDocumentDataTableProps {
  id: number;
  userEmail: string;
  createdAd: string | Date;
  updatedAt: string | Date;
  documentTitle: string;
  documentUrl: string;
  documentType: string;
}

export default function AnnoucmentView({ ann, docsData }: AnnoucmentViewProps) {
  const { data: session } = useSession();
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleClick = () => {
    setIsFormOpen((isFormOpen) => !isFormOpen);
  };

  const description = ann.description;

  useEffect(() => {}, []);
  return (
    <>
      {isFormOpen && (
        <AplicationCard
          close={handleClick}
          userEmail={session?.user?.email || ""}
          docsData={docsData}
        />
      )}
      <div className="bg-white p-8 flex items-center justify-center">
        <div className="bg-slate-100 p-4 w-3/5 rounded-xl flex flex-col">
          <div className="py-4 flex">
            <h3 className="text-3xl w-full">{ann.title}</h3>
            <button
              className="font-bold bg-red-800 py-2 px-8 text-white rounded-md hover:bg-red-600"
              onClick={() => handleClick()}
            >
              Aplikuj
            </button>
          </div>
          <hr className="border-white border-[2px]" />
          <div className="py-4 flex items-center justify-between">
            <div className="flex items-center justify-center gap-4">
              <Image
                src={walletIcon}
                height={32}
                width={32}
                alt="wallet-icon"
              />
              <div className="flex flex-col items-start justify-center">
                <h5 className="uppercase text-sm">Wynagrodzenie</h5>
                <h4 className="font-bold">{ann.salary} zł brutto / h</h4>
              </div>
            </div>
            <div className="flex items-center justify-center gap-4">
              <Image
                src={locationIcon}
                height={32}
                width={32}
                alt="location-icon"
              />
              <div className="flex flex-col items-start justify-center">
                <h5 className="uppercase text-sm">Lokalizacja</h5>
                <h4 className="font-bold">{ann.location}</h4>
              </div>
            </div>
          </div>
          <hr className="border-white border-[2px]" />
          <div
            className="py-4"
            dangerouslySetInnerHTML={{ __html: description }}
          />
          {/* <p className="py-4">{ann.description}</p> */}
          <hr className="border-white border-[2px]" />
          <div className="pb-4 pt-8 flex items-center justify-center">
            <button
              className="font-bold bg-red-800 py-2 px-8 text-white rounded-md hover:bg-red-600"
              onClick={() => handleClick()}
            >
              Aplikuj
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
