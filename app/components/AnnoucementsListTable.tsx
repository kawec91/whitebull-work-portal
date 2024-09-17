"use client";

import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import Link from "next/link";
import * as actions from "../actions/index";

interface annoucementsData {
  id: number;
  title: string;
  salary: string;
  image: string;
  video: string;
  description: string;
  location: string;
}

interface AnnoucementsListTableProps {
  annData: annoucementsData[];
}

export default function AnnoucementsListTable({
  annData,
}: AnnoucementsListTableProps) {
  const data = annData;

  const handleDelete = (id: number) => {
    actions.annoucementDelete(id);
  };

  return (
    <div key={"table"}>
      {data.map((annoucment: annoucementsData) => (
        <div
          key={`${annoucment.title}-d`}
          className="flex gap-2 items-center p-4 justify-between border-b-[1px] border-black"
        >
          <Link
            href={`/ogloszenia/${annoucment.id}`}
            key={`${annoucment.title}`}
            className="flex gap-2 items-center justify-between w-full"
          >
            <div>
              <h3 className="text-xl">{annoucment.title}</h3>
              <p className="text-sm text-gray-500">{annoucment.location}</p>
            </div>
            <div>
              <p>{annoucment.salary} zł / godz. brutto</p>
            </div>
          </Link>
          <div className="flex items-center gap-4 ml-48">
            <Link
              href={`/admin/announcements/${annoucment.id}/edit`}
              className="px-6 py-2 bg-green-800 rounded-full text-white"
            >
              Edytuj
            </Link>
            <button
              className="px-6 py-2 bg-red-600 rounded-full text-white"
              onClick={() => handleDelete(annoucment.id)}
            >
              Usuń
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
