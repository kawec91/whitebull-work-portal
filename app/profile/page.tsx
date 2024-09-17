import { db } from "../db";
import ProfileDocumentsTable from "../components/ProfileDocumentsTable";
import ProfileTop from "../components/ProfileTop";
import { Documents } from "@prisma/client";

interface ProfileDocumentsTableProps {
  userEmail: string | null | undefined;
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

export default async function ProfilePage({
  userEmail,
}: ProfileDocumentsTableProps) {
  const profileDocuments: Documents[] = await db.documents.findMany();

  const userDocsData: DocumentDataTableProps[] = profileDocuments.map(
    (doc) => ({
      id: doc.id,
      userEmail: doc.userEmail,
      createdAd: doc.createdAd,
      updatedAt: doc.updatedAt,
      documentTitle: doc.documentTitle,
      documentUrl: doc.documentUrl,
      documentType: doc.documentType,
    })
  );
  return (
    <>
      <div className="py-4 flex flex-col items-center justify-center min-h-[calc(100vh_-_150px)]">
        <ProfileTop />
        <div className="w-1/4 py-4">
          <hr className="border-[2px] border-black" />
        </div>
        <h4 className="font-bold text-xl uppercase">Dokumenty</h4>
        <div className="w-1/4 py-4">
          <hr className="border-[2px] border-black" />
        </div>
        <div className="w-1/4 flex flex-col items-start gap-4">
          <ProfileDocumentsTable docsData={userDocsData} />
        </div>
        <div className="w-1/4 py-4">
          <hr className="border-[2px] border-black" />
        </div>
        <h4 className="font-bold text-xl uppercase">Moje rekrutacje</h4>
        <div className="w-1/4 py-4">
          <hr className="border-[2px] border-black" />
        </div>
        <div className="w-1/4 flex flex-col items-center justify-center gap-4">
          <p>Brak złożonych aplikacji</p>
        </div>
        <div className="w-1/4 py-4">
          <hr className="border-[2px] border-black" />
        </div>
        {/* <p>Usuwanie konta użytkownika przez użytkownika, po potwierdzeniu haslem?</p> */}
        {/* <p>Podgląd rekrutacji w których użytkownik bierze udział?</p>
        <p>Opcjonalnie pole dodawania numeru telefonu?</p> */}
      </div>
    </>
  );
}
