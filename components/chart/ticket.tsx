'use client'

import { TicketFull } from "@/lib/validators/ticket"
import { allTickets } from "@/service/tickets"
import { data } from "autoprefixer"
import { useQuery } from "react-query"
import { SkeletonCard } from "../SkeletonCard"

export default function Ticket() {
  const { data: response , error, isLoading } = useQuery({
      queryFn: allTickets,
      queryKey: ["tickets"]
    })

    if(error) return <>error...</>

    if(isLoading) return <SkeletonCard />

    const totalCash = response.data.reduce((total: number, ticket: TicketFull) => {
      return total + (ticket.price || 0)
    }, 0)

    return (
        <div className="relative flex flex-col min-w-0 break-words w-full h-full mb-6 shadow-lg rounded bg-blueGray-700">
        <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full max-w-full flex-grow flex-1">
              <h2 className="text-blueGray-100 text-xl font-semibold">Billets</h2>
            </div>
          </div>
        </div>
        <div className="px-4">
            <div className="text-2xl font-bold text-yellow-500">
              {totalCash}$
            </div>
            <div className="text-xs text-gray-500 mt-2">
                Pour {response.data.length} tickets
            </div>
        </div>
      </div>
    )
}