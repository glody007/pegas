import Image from 'next/image'
import React from 'react'
import background from '../images/booking-background.jpg'
interface Props  {
    name: string,
    img: string
}

export default function DestinationCard({ name, img}: Props) {
  return (
    <div className="relative flex sm:flex-1 h-[300px] bg-slate-100 border-slate-200 hover:border-blue-500 rounded-xl p-4">
        <p className="text-xl text-white font-extrabold drop-shadow-xl p-2 z-50">
            {name}
        </p>
        <div className="absolute top-0 left-0 w-full h-full rounded-xl">
          <Image fill objectFit="cover" src={img} alt="Background Image" className="rounded-xl" />
        </div>
        <div className="absolute top-0 left-0 w-full h-full rounded bg-blue-600 opacity-10 rounded-xl"></div>
    </div>
  )
}