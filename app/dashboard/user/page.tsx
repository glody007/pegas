import { DataTable } from "./data-table"
import { columns, departure } from "./columns"

async function getData(): Promise<departure[]> {
    // Fetch data from your API here.
    return [
      {
        id: "1",
        name: "dyglo",
        email: "alchemy@gmail.com",
        sex: "M",
        birthday: new Date(),
        role: "admin"
      },
      {
        id: "2",
        name: "tech",
        email: "controller@gmail.com",
        sex: "M",
        birthday: new Date(),
        role: "controller"
      },
      {
        id: "3",
        name: "Namy",
        email: "driver@gmail.com",
        sex: "F",
        birthday: new Date(),
        role: "driver"
      },
      {
        id: "4",
        name: "Usopp",
        email: "driver@gmail.com",
        sex: "M",
        birthday: new Date(),
        role: "passenger"
      },
      {
        id: "5",
        name: "Marshall",
        email: "driver@gmail.com",
        sex: "F",
        birthday: new Date(),
        role: "seller"
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