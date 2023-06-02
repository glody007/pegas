"use client"

import { TicketFull } from "@/lib/validators/ticket"
import { format } from "date-fns"


interface TicketMiniBackProps {
    ticket: TicketFull
}

export function TicketMiniBack({ ticket }: TicketMiniBackProps) {
  const start = new Date(ticket.schedule.start)

  return (
    <div className="w-[800px] h-[260] flex border rounded-xl">
        <div className="flex flex-col flex-[0.4] p-2 border-r-2 border-r-black border-dashed">
            <div className="flex items-end rounded-t-xl">
                <div className="flex justify-between flex-1">
                    <div className="flex flex-col">
                        <p className="text-xs text-gray-500">Company</p>
                        <h2>LA PATIENCE</h2>
                    </div>
                    <div className="flex flex-col items-end">
                        <p className="text-xs text-gray-500">Seat</p>
                        <h2>{ticket.seat}</h2>
                    </div>
                </div>
            </div>
            <div className="flex flex-col mt-2">
                <h2 className="text-xs text-gray-500">
                    NOM DU PASSAGER
                </h2>
                <h1 className="font-bold">
                    {ticket.name.toUpperCase()}
                </h1>
                <div className="flex space-x-4">
                    <div>
                        <h2 className="text-xs text-gray-500 mt-2">
                            FROM
                        </h2>
                        <h1 className="font-bold">
                            {ticket.schedule.route.from}
                        </h1>
                    </div>
                    <div>
                        <h2 className="text-xs text-gray-500 mt-2">
                            TO
                        </h2>
                        <h1 className="font-bold">
                            {ticket.schedule.route.to}
                        </h1>
                    </div>
                </div>
                <div className="flex space-x-4">
                    <div>
                        <h2 className="text-xs text-gray-500 mt-2">
                            DATE
                        </h2>
                        <h1 className="font-bold">
                            {format(start, "dd-mm-yyyy")}
                        </h1>
                    </div>
                    <div>
                        <h2 className="text-xs text-gray-500 mt-2">
                            HEURE
                        </h2>
                        <h1 className="font-bold">
                            {format(start, "HH:mm")}
                        </h1>
                    </div>
                </div>
            </div>
        </div>
        <div className="flex-[0.6] flex bg-black rounded-r-xl">
            <div className="flex-[0.8] flex justify-end items-center">
                <h1 className="text-xl text-white font-bold">
                    LA PATIENCE
                </h1>
            </div>
            <div className="relative flex-[0.2] flex justify-center">
                <h1 className="rotate-90 mr-20 font-semibold text-center text-white">
                    BOARDING PASS
                </h1>
            </div>
        </div>
    </div>
  )
}
