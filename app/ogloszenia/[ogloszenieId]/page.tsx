import { Annoucment, Documents } from "@prisma/client";
import React from "react";
import { db } from "../../db/index";
import { notFound } from "next/navigation";
import AnnoucmentView from "@/app/components/AnnoucmentView";

interface AnnoucmentViewPageProps {
  params: {
    ogloszenieId: string;
  };
}

interface DocumentDataTableProps {
  id: number;
  userEmail: string;
  createdAd: string | Date;
  updatedAt: string | Date;
  documentTitle: string;
  documentUrl: string;
  documentType: string;
}

export default async function AnnoucmentDetails(
  props: AnnoucmentViewPageProps
) {
  const annId = parseInt(props.params.ogloszenieId);
  console.log("PARAMS", props.params);

  const annoucement: Annoucment | null = await db.annoucment.findUnique({
    where: {
      id: annId,
    },
  });

  const myUserDocuments: Documents[] | null = await db.documents.findMany({
    where: {
      documentType: "cv",
    },
  });

  const userDocsData: DocumentDataTableProps[] = myUserDocuments.map((doc) => ({
    id: doc.id,
    userEmail: doc.userEmail,
    createdAd: doc.createdAd,
    updatedAt: doc.updatedAt,
    documentTitle: doc.documentTitle,
    documentUrl: doc.documentUrl,
    documentType: doc.documentType,
  }));

  if (!annoucement) {
    return notFound();
  }

  const plainAnnoucement = {
    id: annoucement.id,
    title: annoucement.title,
    salary: annoucement.salary,
    image: annoucement.image,
    video: annoucement.video,
    description: annoucement.description,
    location: annoucement.location,
  };

  return (
    <div>
      <AnnoucmentView ann={plainAnnoucement} docsData={userDocsData} />
    </div>
  );
}
