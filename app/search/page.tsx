'use client'

import PassengerSearchFilter from "@/components/PassengerSearchFilter";
import SearchBar from "@/components/SearchBar";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function Search() {
    const searchParams = useSearchParams();
    const from = searchParams?.get('from') ?? undefined
    const to = searchParams?.get('to') ?? undefined
    const date = searchParams?.get('date') ?? undefined

    return (
        <main className="">
        {/* START HERO SECTION */}
        <div className="relative flex flex-col w-full justify-center items-center justify-center p-4 pb-8">

            <div className="absolute top-0 left-0 w-full h-full">
                <Image fill objectFit="cover" src="/images/booking-background.jpg" alt="Background Image" />
            </div>
            <div className="absolute top-0 left-0 w-full h-full bg-blue-600 opacity-60"></div>

            <div className="flex flex-col justify-between w-full max-w-[1200px] z-50">
            <div className="flex justify-between">
                <Link href="/"> 
                <div className="font-bold text-white p-2 rounded-lg bg-blue-800 bg-opacity-40">
                    LA PATIENCE
                </div>
                </Link>
                <div className="">
                <Link href="/feature"> 
                    <Button variant="secondary">Dashboard</Button>
                </Link>
                </div>
            </div>
            <div className="flex w-full justify-center mt-8">
                <SearchBar from={from} to={to} date={date ? new Date(date) : undefined} />
            </div>
            </div>
        </div>
        {/* END HERO SECTION */}

        {/* END TRENDING SECTION */}
        <div className="flex justify-center my-8">
            <div className="flex w-full space-x-4 max-w-[1200px]">
                <div className="flex-[0.2] flex flex-col">
                    <PassengerSearchFilter />

                </div>
                <div className="flex-[0.8] flex flex-col min-h-[200px]">
                    <p className="text-xl font-semibold">
                        Resultats: 0 bus trouvés
                    </p>

                </div>
            </div>
        </div>
        
        </main>
    )
}
