import { SearchCoach } from "@/components/SearchCoach"
import { DataTable } from "@/components/ui/data-table-manifest"
import { Schedule, columns } from "./columns"

async function getData(): Promise<Schedule[]> {
  // Fetch data from your API here.
  return [
    {
      id: "1",
      coach: "LP-450",
      boarding: new Date(), 
      dropping: new Date(),
      type: "MOUNTAIN LTD",
      route: "Lubumbashi-Likasi",
      manifest: "23",
      available: 49,
      price: 20,
      status: "pending",
      view: "view"
    },
    {
      id: "1",
      coach: "LP-600",
      boarding: new Date(), 
      dropping: new Date(),
      type: "MOUNTAIN LTD",
      route: "Lubumbashi-Kolwezi",
      manifest: "23",
      available: 49,
      price: 20,
      status: "pending",
      view: "view"
    },
    {
      id: "1",
      coach: "LP-780",
      boarding: new Date(), 
      dropping: new Date(),
      type: "MOUNTAIN LTD",
      route: "Lubumbashi-Likasi",
      manifest: "23",
      available: 49,
      price: 20,
      status: "pending",
      view: "view"
    },
    {
      id: "1",
      coach: "LP-450",
      boarding: new Date(), 
      dropping: new Date(),
      type: "MOUNTAIN LTD",
      route: "Lubumbashi-Kipushi",
      manifest: "23",
      available: 49,
      price: 20,
      status: "pending",
      view: "view"
    },
    {
      id: "1",
      coach: "LP-460",
      boarding: new Date(), 
      dropping: new Date(),
      type: "MOUNTAIN LTD",
      route: "Lubumbashi-Kalemi",
      manifest: "23",
      available: 49,
      price: 20,
      status: "pending",
      view: "view"
    },
    {
      id: "1",
      coach: "LP-450",
      boarding: new Date(), 
      dropping: new Date(),
      type: "MOUNTAIN LTD",
      route: "Lubumbashi-Likasi",
      manifest: "23",
      available: 49,
      price: 20,
      status: "pending",
      view: "view"
    },
    {
      id: "1",
      coach: "LP-600",
      boarding: new Date(), 
      dropping: new Date(),
      type: "MOUNTAIN LTD",
      route: "Lubumbashi-Kolwezi",
      manifest: "23",
      available: 49,
      price: 20,
      status: "pending",
      view: "view"
    },
    {
      id: "1",
      coach: "LP-780",
      boarding: new Date(), 
      dropping: new Date(),
      type: "MOUNTAIN LTD",
      route: "Lubumbashi-Likasi",
      manifest: "23",
      available: 49,
      price: 20,
      status: "pending",
      view: "view"
    },
    {
      id: "1",
      coach: "LP-450",
      boarding: new Date(), 
      dropping: new Date(),
      type: "MOUNTAIN LTD",
      route: "Lubumbashi-Kipushi",
      manifest: "23",
      available: 49,
      price: 20,
      status: "pending",
      view: "view"
    },
    {
      id: "1",
      coach: "LP-460",
      boarding: new Date(), 
      dropping: new Date(),
      type: "MOUNTAIN LTD",
      route: "Lubumbashi-Kalemi",
      manifest: "23",
      available: 49,
      price: 20,
      status: "pending",
      view: "view"
    },
    {
      id: "1",
      coach: "LP-450",
      boarding: new Date(), 
      dropping: new Date(),
      type: "MOUNTAIN LTD",
      route: "Lubumbashi-Likasi",
      manifest: "23",
      available: 49,
      price: 20,
      status: "pending",
      view: "view"
    },
    {
      id: "1",
      coach: "LP-600",
      boarding: new Date(), 
      dropping: new Date(),
      type: "MOUNTAIN LTD",
      route: "Lubumbashi-Kolwezi",
      manifest: "23",
      available: 49,
      price: 20,
      status: "pending",
      view: "view"
    },
    {
      id: "1",
      coach: "LP-780",
      boarding: new Date(), 
      dropping: new Date(),
      type: "MOUNTAIN LTD",
      route: "Lubumbashi-Likasi",
      manifest: "23",
      available: 49,
      price: 20,
      status: "pending",
      view: "view"
    },
    {
      id: "1",
      coach: "LP-450",
      boarding: new Date(), 
      dropping: new Date(),
      type: "MOUNTAIN LTD",
      route: "Lubumbashi-Kipushi",
      manifest: "23",
      available: 49,
      price: 20,
      status: "pending",
      view: "view"
    },
    {
      id: "1",
      coach: "LP-460",
      boarding: new Date(), 
      dropping: new Date(),
      type: "MOUNTAIN LTD",
      route: "Lubumbashi-Kalemi",
      manifest: "23",
      available: 49,
      price: 20,
      status: "pending",
      view: "view"
    },
    {
      id: "1",
      coach: "LP-450",
      boarding: new Date(), 
      dropping: new Date(),
      type: "MOUNTAIN LTD",
      route: "Lubumbashi-Likasi",
      manifest: "23",
      available: 49,
      price: 20,
      status: "pending",
      view: "view"
    },
    {
      id: "1",
      coach: "LP-600",
      boarding: new Date(), 
      dropping: new Date(),
      type: "MOUNTAIN LTD",
      route: "Lubumbashi-Kolwezi",
      manifest: "23",
      available: 49,
      price: 20,
      status: "pending",
      view: "view"
    },
    {
      id: "1",
      coach: "LP-780",
      boarding: new Date(), 
      dropping: new Date(),
      type: "MOUNTAIN LTD",
      route: "Lubumbashi-Likasi",
      manifest: "23",
      available: 49,
      price: 20,
      status: "pending",
      view: "view"
    },
    {
      id: "1",
      coach: "LP-450",
      boarding: new Date(), 
      dropping: new Date(),
      type: "MOUNTAIN LTD",
      route: "Lubumbashi-Kipushi",
      manifest: "23",
      available: 49,
      price: 20,
      status: "pending",
      view: "view"
    },
    {
      id: "1",
      coach: "LP-460",
      boarding: new Date(), 
      dropping: new Date(),
      type: "MOUNTAIN LTD",
      route: "Lubumbashi-Kalemi",
      manifest: "23",
      available: 49,
      price: 20,
      status: "pending",
      view: "view"
    },
    {
      id: "1",
      coach: "LP-450",
      boarding: new Date(), 
      dropping: new Date(),
      type: "MOUNTAIN LTD",
      route: "Lubumbashi-Likasi",
      manifest: "23",
      available: 49,
      price: 20,
      status: "pending",
      view: "view"
    },
    {
      id: "1",
      coach: "LP-600",
      boarding: new Date(), 
      dropping: new Date(),
      type: "MOUNTAIN LTD",
      route: "Lubumbashi-Kolwezi",
      manifest: "23",
      available: 49,
      price: 20,
      status: "pending",
      view: "view"
    },
    {
      id: "1",
      coach: "LP-780",
      boarding: new Date(), 
      dropping: new Date(),
      type: "MOUNTAIN LTD",
      route: "Lubumbashi-Likasi",
      manifest: "23",
      available: 49,
      price: 20,
      status: "pending",
      view: "view"
    },
    {
      id: "1",
      coach: "LP-450",
      boarding: new Date(), 
      dropping: new Date(),
      type: "MOUNTAIN LTD",
      route: "Lubumbashi-Kipushi",
      manifest: "23",
      available: 49,
      price: 20,
      status: "pending",
      view: "view"
    },
    {
      id: "1",
      coach: "LP-460",
      boarding: new Date(), 
      dropping: new Date(),
      type: "MOUNTAIN LTD",
      route: "Lubumbashi-Kalemi",
      manifest: "23",
      available: 49,
      price: 20,
      status: "pending",
      view: "view"
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
