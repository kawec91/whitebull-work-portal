import ImportantDocumentsSendForm from "@/app/components/ImportantDocumentsSendForm";
import ImportantDocumentsTable from "@/app/components/ImportantDocumentsTable";
import { db } from "@/app/db";
import { ImportantDocuments } from "@prisma/client";
import Image from "next/image";
import React from "react";

interface ImportantDocumentsProps {
  id: number;
  createdAt: string | Date;
  updatedAt: string | Date;
  documentTitle: string;
  documentUrl: string;
  documentType: string;
}

export default async function ImportantDocumentsPage() {
  const importantDocuments: ImportantDocuments[] =
    await db.importantDocuments.findMany();

  const importantDocument: ImportantDocumentsProps[] = importantDocuments.map(
    (document) => ({
      id: document.id,
      createdAt: document.createdAt,
      updatedAt: document.updatedAt,
      documentTitle: document.documentTitle,
      documentUrl: document.documentUrl,
      documentType: document.documentType,
    })
  );
  return (
    <div>
      <ImportantDocumentsSendForm />
      <div key={"imp-docs-table-wrapper"}>
        <ImportantDocumentsTable tableData={importantDocument} />
      </div>
    </div>
  );
}
