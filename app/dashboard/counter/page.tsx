import { DataTable } from "./data-table"
import { columns, counter } from "./columns"

async function getData(): Promise<counter[]> {
    // Fetch data from your API here.
    return [
      {
        id: "1",
        name: "Lubumbashi 1",
        city: "Lubumbashi",
        country: "DRC"
      },
      {
        id: "2",
        name: "Likasi 2",
        city: "Likasi",
        country: "DRC"
      },
      {
        id: "1",
        name: "Kolwezi",
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