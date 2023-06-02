"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TicketFull } from "@/lib/validators/ticket"
import { format } from "date-fns"
import { TicketMiniBack } from "./TicketMiniBack"
import { TicketMiniFront } from "./TicketMiniFront"

  

interface TicketDetailsProps {
    ticket: TicketFull,
    handleSuccess?: () => void
}

export function TicketDetails({ ticket, handleSuccess }: TicketDetailsProps) {

  return (
    <Tabs defaultValue="mini" className="w-[800px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="mini">Mini</TabsTrigger>
        <TabsTrigger value="A4">A4</TabsTrigger>
      </TabsList>
      <TabsContent value="mini">
        <div className="flex flex-col py-8 space-y-8">
            <TicketMiniFront ticket={ticket} />
            <TicketMiniBack ticket={ticket} />
        </div>
      </TabsContent>
      <TabsContent value="A4">
        
      </TabsContent>
    </Tabs>
  )
}
