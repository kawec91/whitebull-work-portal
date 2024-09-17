import React from "react";
import ImportantDocumentsTableCard from "./ImportantDocumentsTableCard";

interface documentsData {
  id: number;
  createdAt: Date | string;
  updatedAt: Date | string;
  documentTitle: string;
  documentUrl: string;
  documentType: string;
}

interface DocumentsTableProps {
  tableData: documentsData[];
}

export default function ImportantDocumentsTable({
  tableData,
}: DocumentsTableProps) {
  console.log("tabble docs", tableData);
  return (
    <div key={"imp-doc-table"} className="py-4">
      {tableData.map((document: documentsData) => (
        <ImportantDocumentsTableCard
          title={document.documentTitle}
          url={document.documentUrl}
          key={`${document.documentTitle}-card-${document.id}`}
          id={document.id}
        />
      ))}
    </div>
  );
}

// {tableData.length === 0 ? (
//   <p className="text-center">Brak dokumentów</p>
// ) : (
//   <>
