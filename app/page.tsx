import Image from 'next/image';
import Link from 'next/link'
import React from 'react'
import { db } from "./db/index"
import { Annoucment } from '@prisma/client';
import AnnoucementsListTable from '@/app/components/AnnoucementsListTable';
import HomeAnnoucmentsCardList from './components/HomeAnnoucmentsCardList';

interface AnnouncementsProps {
    id: number,
    title: string;
    salary: string;
    image: string;
    video : string;
    description: string;
    location: string;
}

export default async function Home() {
    const annoucments: Annoucment[] = await db.annoucment.findMany();

    const annData: AnnouncementsProps[] = annoucments.map((annoucment) =>( {
        id: annoucment.id,
        title: annoucment.title,
        salary: annoucment.salary,
        image: annoucment.image,
        video : annoucment.video ,
        description: annoucment.description,
        location: annoucment.location,
    }));
   
  return (
    <div className='px-4 h-[calc(100vh_-_152px)] flex flex-col'>
        <h3 className='text-3xl text-center py-2 '>Aktualnie prowadzone rekrutacje</h3>
        <div className='flex items-center justify-center gap-12 h-2/3'>
          <HomeAnnoucmentsCardList annData={annData} />
        </div>
    </div>
  )
}
