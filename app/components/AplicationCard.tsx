"use client";

import React, { useEffect, useState } from "react";
import NotUploadedDocumentCard from "./NotUploadedDocumentCard";
import UploadedDocumentCard from "./UploadedDocumentCard";

interface AplicationCardProps {
  close: Function;
  userEmail: string | undefined;
  docsData: documentDataTableProps[];
}

interface documentDataTableProps {
  id: number;
  userEmail: string;
  createdAd: string | Date;
  updatedAt: string | Date;
  documentTitle: string;
  documentUrl: string;
  documentType: string;
}

export default function AplicationCard({
  close,
  userEmail,
  docsData,
}: AplicationCardProps) {
  const inputDocs = docsData || [];
  const userDocCV = [];

  for (let i = 0; i < inputDocs.length; i++) {
    if (inputDocs[i].userEmail === userEmail) {
      userDocCV.push(inputDocs[i]);
    }
  }

  console.log("doooooks", userDocCV);
  return (
    <div className="w-full h-full bg-black/75 fixed top-0 left-0 flex items-center justify-center">
      <div className="bg-white p-8 w-3/5 relative">
        <div
          className="font-bold text-2xl text-red-700 absolute z-10 top-4 right-4 cursor-pointer"
          onClick={() => close()}
        >
          X
        </div>
        <div
          className="flex flex-col items-start justify-center"
          //   action={"/api/user/aplication/add"}
          //   method="POST"
          //   encType="multipart/form-data"
        >
          <div>
            <h3 className="text-center text-2xl pb-4 font-bold">
              Informacje dotyczące dalszej rekrutacji
            </h3>
            <p>
              1. Po zakwalifikowaniu się do kolejnego etapu rekrutacji otrzyma
              Pani/Pan wiaidomość e-mail z formularzem do wypełnienia.
            </p>
            <p>
              2. Wypełniony formularz należy wydrukować, wypełnić oraz umieścić
              na tej stronie w zakładce Profil.
            </p>
            <p>
              3. Po ustaleniu terminu dnia próbnego należy przedłożyć oryginał
              w/w dokumentu w lokalu.
            </p>
            <p>
              4. Po pozytywnym przejściu dnia próbnego otrzyma Pani/Pan kolejną
              wiadomość e-mail z listą dokumentów jakie trzeba przygotować przed
              podjęciem pracy - niestety brak jakiegokolwiek dokumentu
              uniemożliwi nam podpisanie z Państwem umowy.
            </p>
            <p>
              5. W przypadku odrzucenia Państwa zgłoszenia zostaną Państwo o tym
              fakcie poinformowani drogą elektroniczna (e-mail)
            </p>
          </div>
          <div className="py-4 w-full">
            <hr className="border-[2px] border-black/75 min-w-full" />
          </div>
          <div>
            <h3 className="text-center text-2xl pb-4 font-bold">
              Ważne! Rozliczenie dnia próbnego
            </h3>
            <p>1. Dzień próbny składa się zawsze z 5h</p>
            <p>
              2. Stawka godzinowa dnia próbnego to zawsze aktualna najniższa
              krajowa brutto
            </p>
            <p className="font-bold">
              3. Wypłata należności za dzień próbny przelana zostanie na
              wskazany przez aplikanta numer konta bankowego podany w formulażu
              (o którym mowa wyżej).
            </p>
          </div>
          <div className="py-4 w-full">
            <hr className="border-[2px] border-black/75 min-w-full" />
          </div>
          {userDocCV.length > 0 ? (
            <UploadedDocumentCard
              id={userDocCV[0].id}
              title={userDocCV[0].documentTitle}
              url={userDocCV[0].documentUrl}
              userEmail={userDocCV[0].userEmail}
              showDeleteBtn={false}
            />
          ) : (
            <NotUploadedDocumentCard
              type="cv"
              checkBoxInfo="Akceptuje regulamin i wyrażam zgodę na przetwarzanie moich danych na potrzeby rekrutacji"
              infoText="Dodaj życiorys"
            />
          )}
        </div>
      </div>
    </div>
  );
}
