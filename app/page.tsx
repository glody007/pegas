import SearchBar from "@/components/SearchBar";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import backroung from '../images/booking-background.jpg'

export default function Home() {
  return (
    <main className="">
      {/* START HERO SECTION */}
      <div className="relative flex flex-col w-full justify-center items-center justify-center p-4 pb-8">

        <div className="absolute top-0 left-0 w-full h-full">
          <Image fill objectFit="cover" src={backroung} alt="Background Image" />
        </div>
        <div className="absolute top-0 left-0 w-full h-full bg-blue-600 opacity-80"></div>

        <div className="flex flex-col justify-between w-full max-w-[1200px] z-50">
          <div className="flex justify-between">
            <Link href="/"> 
              <div className="font-bold text-white p-2 rounded-lg bg-blue-600">
                LA PATIENCE
              </div>
            </Link>
            <div className="">
              <Link href="/feature"> 
                <Button variant="secondary">Dashboard</Button>
              </Link>
            </div>
          </div>
          <div className="mt-24">
            <h1 className="text-5xl text-white font-extrabold">
              Plus besoin de faire la queue
            </h1>
            <p className="text-3xl font-thin mt-4 text-white">
              Réserver votre billet de bus en ligne.
            </p>
          </div>
          <div className="flex w-full justify-center mt-16">
            <SearchBar />
          </div>
        </div>
      </div>
      {/* END HERO SECTION */}

      {/* END TRENDING SECTION */}
      <div className="flex justify-center mt-8">
        <div className="flex flex-col justify-between w-full max-w-[1200px] px-4">
          <div className="flex">
            <h2 className="text-xl font-semibold">
              Trending destinations
            </h2>
          </div>
          <div className="flex">
            <h3 className="text-slate-500">
              Most popular choices for travellers from the Democratic Republic of Congo
            </h3>
          </div>
        </div>
      </div>
      {/* END TRENDING SECTION */}
      
    </main>
  )
}
