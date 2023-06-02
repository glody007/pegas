"use client"

import { TicketFull } from "@/lib/validators/ticket"
import { format } from "date-fns" 

interface TicketMiniFrontProps {
    ticket: TicketFull
}

export function TicketMiniFront({ ticket }: TicketMiniFrontProps) {
    console.log(ticket)

  return (
    <div className="w-[800px] h-[260] flex flex-col border rounded-xl">
        <div className="flex items-end flex-[0.3] bg-black rounded-t-xl">
            <div className="flex flex-[0.1]">
                
            </div>
            <div className="flex justify-between flex-[0.6] py-2 p-2">
                <div className="flex flex-col">
                    <p className="text-xs text-gray-500">Company</p>
                    <h2 className="text-white">LA PATIENCE</h2>
                </div>
                <div className="flex flex-col">
                    <p className="text-xs text-gray-500">Boarding pass</p>
                    <h2 className="text-white">{ticket.schedule.bus.class.name.toUpperCase()}</h2>
                </div>
                <div className="flex flex-col">
                    <p className="text-xs text-gray-500">Seat</p>
                    <h2 className="text-white">{ticket.seat}</h2>
                </div>
            </div>
            <div className="flex justify-between flex-[0.4] px-4 py-2">
                <div className="flex flex-col">
                    <p className="text-xs text-gray-500">Company</p>
                    <h2 className="text-white">LA PATIENCE</h2>
                </div>
                <div className="flex flex-col items-end">
                    <p className="text-xs text-gray-500">Seat</p>
                    <h2 className="text-white">{ticket.seat}</h2>
                </div>
            </div>
        </div>
        <div className="flex flex-[0.7] rounded-b-xl">
            <div className="relative flex flex-[0.1] border-r-2 border-black">
                <h1 className="absolute -left-4 top-14 -rotate-90 font-semibold text-center">
                    BOARDING PASS
                </h1>
            </div>
            <div className="flex space-x-8 flex-[0.6] border-r-2 p-2 border-dashed border-black">
                <div className="flex flex-col">
                    <h2 className="text-xs text-gray-500">
                        NOM DU PASSAGER
                    </h2>
                    <h2 className="text-lg font-bold">
                        {ticket.name.toUpperCase()}
                    </h2>
                    <h2 className="text-xs text-gray-500 mt-2">
                        FROM
                    </h2>
                    <h2 className="text-lg font-bold">
                        {ticket.schedule.route.from}
                    </h2>
                    <h2 className="text-xs text-gray-500 mt-2">
                        DATE
                    </h2>
                    <h2 className="text-lg font-bold">
                        {format(ticket.schedule.start, "dd-mm-yyyy")}
                    </h2>
                </div>
                <div className="flex flex-col">
                    <h2 className="text-xs text-gray-500">
                        HEURE
                    </h2>
                    <h2 className="text-lg font-bold">
                        {format(ticket.schedule.start, "HH:mm")}
                    </h2>
                    <h2 className="text-xs text-gray-500 mt-2">
                        TO
                    </h2>
                    <h2 className="text-lg font-bold">
                        {ticket.schedule.route.to}
                    </h2>
                </div>
            </div>
            <div className="flex flex-[0.4] p-2">
                <div className="flex flex-col">
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
                                {format(ticket.schedule.start, "dd-mm-yyyy")}
                            </h1>
                        </div>
                        <div>
                            <h2 className="text-xs text-gray-500 mt-2">
                                HEURE
                            </h2>
                            <h1 className="font-bold">
                                {format(ticket.schedule.start, "HH:mm")}
                            </h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
