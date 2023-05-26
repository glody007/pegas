import { DataTable } from "./data-table"
import { columns, departure } from "./columns"

async function getData(): Promise<departure[]> {
    // Fetch data from your API here.
    return [
      {
        id: "1",
        name: "Lubumbashi T-1",
        city: "Lubumbashi",
        country: "DRC"
      },
      {
        id: "2",
        name: "Likasi T-4",
        city: "Likasi",
        country: "DRC"
      },
      {
        id: "1",
        name: "Kolwezi T-1",
        city: "Kolwezi",
        country: "DRC"
      },
    ]
  } 

export default async function Departure() {
    const data = await getData()

    return (
        <div className="mx-auto mt-4">
            <DataTable columns={columns} data={data} />
        </div>
    )
}