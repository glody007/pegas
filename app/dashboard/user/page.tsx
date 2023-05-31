import { DataTable } from "./data-table"
import { columns } from "./columns"
import { Role, RoleSchema, User } from "@/lib/validators/user"

function getData(): User[] {
    // Fetch data from your API here.
    return [
      {
        id: "1",
        name: "dyglo",
        email: "alchemy@gmail.com",
        sex: "M",
        birthday: new Date(),
        role: RoleSchema.Enum.admin
      },
      {
        id: "2",
        name: "tech",
        email: "controller@gmail.com",
        sex: "M",
        birthday: new Date(),
        role: RoleSchema.Enum.controller 
      },
      {
        id: "3",
        name: "Namy",
        email: "driver@gmail.com",
        sex: "F",
        birthday: new Date(),
        role: RoleSchema.Enum.driver
      },
      {
        id: "4",
        name: "Usopp",
        email: "driver@gmail.com",
        sex: "M",
        birthday: new Date(),
        role: RoleSchema.Enum.passenger
      },
      {
        id: "5",
        name: "Marshall",
        email: "driver@gmail.com",
        sex: "F",
        birthday: new Date(),
        role: RoleSchema.Enum.seller
      },
    ]
  } 

export default async function Departure() {
    const data = getData()

    return (
        <div className="mx-auto mt-4">
            <DataTable columns={columns} data={data} />
        </div>
    )
}