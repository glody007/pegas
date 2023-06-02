import { SearchCoach } from "@/components/SearchCoach"
import { DataTable } from "@/components/ui/data-table-ticket"
import { Schedule, columns } from "./columns"
import TicketList from "./TicketList"

export default async function Page() {

  return (
    <>
      <div className="mx-auto mt-4">
        <TicketList />
      </div>
    </>
  )
}
