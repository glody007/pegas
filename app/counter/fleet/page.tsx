import { SearchCoach } from "@/components/SearchCoach"
import { DataTable } from "@/components/ui/data-table-manifest"
import { Schedule, columns } from "./columns"

async function getData(): Promise<Schedule[]> {
  // Fetch data from your API here.
  return [
    {
      id: "1",
      name: "LP-450",
      type: "MOUNTAIN LTD",
      manifest: "23",
      price: 20,
      seats: 60,
      status: "available"
    },
    {
      id: "2",
      name: "LP-600",
      type: "MOUNTAIN LTD",
      manifest: "20",
      price: 20,
      seats: 40,
      status: "available"
    },
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
