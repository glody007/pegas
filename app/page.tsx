import SearchBar from "@/components/SearchBar";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import backroung from '../images/booking-background.jpg'

export default function Home() {
  return (
    <main className="">
      <div className="relative flex flex-col w-full justify-center items-center justify-center">

        <div className="absolute top-0 left-0 w-full h-[460px]">
          <Image fill objectFit="cover" src={backroung} alt="Background Image" />
        </div>
        <div className="absolute top-0 left-0 w-full h-[460px] bg-blue-600 opacity-80"></div>

        <div className="flex flex-col justify-between w-[1200px] z-50">
          <div className="flex justify-between py-4">
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
    </main>
  )
}
