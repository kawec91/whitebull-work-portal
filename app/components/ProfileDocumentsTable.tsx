"use client";
import React from "react";
import { useSession } from "next-auth/react";
import NotUploadedDocumentCard from "./NotUploadedDocumentCard";
import UploadedDocumentCard from "./UploadedDocumentCard";

interface ProfileDocumentsTableProps {
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

export default function ProfileDocumentsTable({
  docsData,
}: ProfileDocumentsTableProps) {
  const { data: session } = useSession();

  const userDocsArray = [];

  for (let i = 0; i < docsData.length; i++) {
    if (docsData[i].userEmail === session?.user?.email) {
      userDocsArray.push(docsData[i]);
    }
  }
  return (
    <div className="w-full">
      {userDocsArray.length > 0 ? (
        userDocsArray.map((item) => (
          <UploadedDocumentCard
            key={`card-${item.createdAd}`}
            id={item.id}
            userEmail={session?.user?.email ? session.user.email : ""}
            title={item.documentTitle}
            url={item.documentUrl}
            showDeleteBtn={true}
          />
        ))
      ) : (
        <NotUploadedDocumentCard
          type="cv"
          checkBoxInfo="Potwierdź, że nie jesteś robotem"
          infoText="Dodaj życiorys"
        />
      )}
    </div>
  );
}
