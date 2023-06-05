import DestinationCard from "@/components/DestinationCard";
import SearchBar from "@/components/SearchBar";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import background from '../images/booking-background.jpg'

export default function Home() {
  return (
    <main className="">
      {/* START HERO SECTION */}
      <div className="relative flex flex-col w-full justify-center items-center justify-center p-4 pb-16">

        <div className="absolute top-0 left-0 w-full h-full">
          <Image fill objectFit="cover" src={background} alt="Background Image" />
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
          <div className="mt-40">
            <h1 className="text-5xl text-white font-extrabold">
              Plus besoin de faire la queue
            </h1>
            <p className="text-3xl font-thin mt-4 text-white">
              Réserver votre billet de bus en ligne.
            </p>
          </div>
          <div className="flex w-full justify-center mt-28">
            <SearchBar />
          </div>
        </div>
      </div>
      {/* END HERO SECTION */}

      {/* END TRENDING SECTION */}
      <div className="flex justify-center my-8">
        <div className="flex flex-col justify-between w-full max-w-[1200px] px-4">
          <div className="flex">
            <h2 className="text-xl font-semibold">
              Destinations tendance
            </h2>
          </div>
          <div className="flex">
            <h3 className="text-slate-500">
              Choix les plus populaires pour les voyageurs de la République démocratique du Congo
            </h3>
          </div>
          <div className="flex flex-col sm:flex-row w-full mt-4 space-y-4 sm:space-y-0 space-x-0 sm:space-x-4">
            <DestinationCard name="Lubumbashi" img="/images/lubumbashi.jpg" />
            <DestinationCard name="Cap town" img="/images/cape-town.jpg" />
          </div>
          <div className="flex flex-col sm:flex-row w-full mt-4 space-y-4 sm:space-y-0 space-x-0 sm:space-x-4">
            <DestinationCard name="Kitwe" img="/images/kitwe.jpg" />
            <DestinationCard name="Likasi" img="/images/likasi.jpg" />
            <DestinationCard name="Kolwezi" img="/images/kolwezi.jpg" />
          </div>
        </div>
      </div>
      {/* END TRENDING SECTION */}
      
    </main>
  )
}
