import { SearchCoach } from "@/components/SearchCoach"
import { SellReserve } from "@/components/SellReserve"

export default function Home() {
  return (
    <>
      <SearchCoach />
      <div className="mt-4">
        <SellReserve />
      </div>
    </>
  )
}
