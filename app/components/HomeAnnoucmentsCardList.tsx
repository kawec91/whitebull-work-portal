"use client"

import Image from 'next/image';
import React from 'react'
import obr from '../../public/assets/images/kelnerBydgoszcz.jpg'
import Link from 'next/link';

interface annoucementsData {
    id: number,
    title: string;
    salary: string;
    image: string;
    video : string;
    description: string;
    location: string;
}

interface AnnoucementsListTableProps {
    annData: annoucementsData[];
}

export default function HomeAnnoucmentsCardList({annData} : AnnoucementsListTableProps) {
    const data = annData;
  return (
    <div className='flex items-center flex-wrap justify-around w-full'>
        {data.map((item: annoucementsData) => (<Link href={`/ogloszenia/${item.id}`} key={`${item.id}-${item.title}`} >
                <div className='group cursor-pointer h-[180px] bg-gray-500 rounded-xl relative'>
                    <Image width={150} height={150} src={item.image} alt='annoucment-image' className='rounded-xl w-64 h-72 object-cover ' />
                    <h3 className='absolute z-10 top-1/3 translate-y-1/2 left-0 bg-black/75 text-white py-2 text-center group-hover:text-red-500'>{item.title} <br /> Więcej...</h3>
                    <div className='absolute z-20 -bottom-3/4 -left-5 bg-white p-1 rounded-full'>
                        <p className='py-2 px-4 bg-black text-white rounded-full group-hover:text-red-500'>{item.salary} PLN BRUTTO/H</p>
                    </div>
                </div>
            </Link>
        ))}
    </div>
  )
}
