import { SearchCoach } from "@/components/SearchCoach"
import { DataTable } from "@/components/ui/data-table-ticket"
import { Schedule, columns } from "./columns"

async function getData(): Promise<Schedule[]> {
  // Fetch data from your API here.
  return [
    {
      id: "1",
      coach: "LP-450",
      name: "Glody mbutwile",
      contact: "00078800000",
      from: "Lubumbashi", 
      to: "Likasi",
      type: "MOUNTAIN LTD",
      pnr: "88484Q",
      boarding: "Lubumbashi departure",
      departure: new Date(),
      seat: "A3",
      price: 20,
      status: "pending"
    }
  ]
} 

export default async function Page() {
  const data = await getData()

  return (
    <>
      <div className="mx-auto mt-4">
        <DataTable columns={columns} data={data} />
      </div>
    </>
  )
}
