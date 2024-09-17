import Image from 'next/image';
import Link from 'next/link'
import React from 'react'
import { db } from "../../db/index"
import { Annoucment } from '@prisma/client';
import AnnoucementsListTable from '@/app/components/AnnoucementsListTable';

interface AnnouncementsProps {
    id: number,
    title: string;
    salary: string;
    image: string;
    video : string;
    description: string;
    location: string;
}

export default async function AnnouncementsPage() {
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
    <div className='relative'>
        <div>
            <AnnoucementsListTable annData={annData}/>
            
        </div>
        <Link href='/admin/announcements/new' className=' fixed bottom-16 right-5 flex items-center gap-1 hover:bg-red-400 hover:text-white pl-2 rounded-xl'>
            <div className='text-lg pl-2'>Dodaj ogłoszenie</div>
            <Image alt="plus-icon" src="/assets/icons/plus.png" height={56} width={56} className='bg-red-400 rounded-full p-2'/>
        </Link>
    </div>
  )
}
