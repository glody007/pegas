"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TicketFull } from "@/lib/validators/ticket"
import { format } from "date-fns"
import { TicketMiniBack } from "./TicketMiniBack"
import { TicketMiniFront } from "./TicketMiniFront"
import { Button } from "./ui/button"
import { FileIcon, PrinterIcon } from "lucide-react"

  

interface TicketDetailsProps {
    ticket: TicketFull,
    handleSuccess?: () => void
}

export function TicketDetails({ ticket, handleSuccess }: TicketDetailsProps) {

  return (
    <Tabs defaultValue="preview" className="w-[800px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="preview">Preview</TabsTrigger>
        <TabsTrigger value="print">Impression</TabsTrigger>
      </TabsList>
      <TabsContent value="preview">
        <div className="flex flex-col py-8 space-y-8">
            <TicketMiniFront ticket={ticket} />
            <TicketMiniBack ticket={ticket} />
        </div>
      </TabsContent>
      <TabsContent value="print">
        <div className="flex flex-col space-y-8 mt-4">
            <div className="flex justify-end space-x-4">
              <Button>
                <PrinterIcon />
                Imprimer
              </Button>
              <Button variant="secondary">
                <FileIcon />
                Download PDF
              </Button>
            </div>
            <div className="flex flex-col space-y-4">
              <TicketMiniFront ticket={ticket} />
              <TicketMiniBack ticket={ticket} />
            </div>
        </div>
      </TabsContent>
    </Tabs>
  )
}
