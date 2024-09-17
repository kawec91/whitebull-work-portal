import React from "react";
import { db } from "../../../../db/index";
import { Annoucment } from "@prisma/client";
import { notFound } from "next/navigation";
import AnnoucementEditForm from "@/app/components/AnnoucementEditForm";

interface AnnoucmentEditProps {
  params: {
    ogloszenieId: string;
  };
}

export default async function AnnoucmentEditPage(props: AnnoucmentEditProps) {
  const annoucmentId = parseInt(props.params.ogloszenieId);
  const annoucement: Annoucment | null = await db.annoucment.findUnique({
    where: {
      id: annoucmentId,
    },
  });

  if (!annoucement) {
    return notFound();
  }

  const plainAnnoucment = {
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
      <AnnoucementEditForm ann={plainAnnoucment} />
    </div>
  );
}
