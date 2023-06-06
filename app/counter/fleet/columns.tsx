"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogContentFull,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { format } from "date-fns"
import { SellReserve } from "@/components/SellReserve"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Schedule = {
  id: string
  name: string
  type: string
  manifest: string
  price: number
  seats: number
  status: "available" | "processing" | "success" | "failed"
}

export const columns: ColumnDef<Schedule>[] = [
  {
    accessorKey: "coach",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const name: String = row.original.name
      return <div className="text-lg">{name}</div>
    },
  },
  {
    accessorKey: "type",
    header: "Type",
  },
  {
    accessorKey: "seats",
    header: "No Seats",
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => {
      const price = parseFloat(row.getValue("price"))
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(price)
 
      return <div>{formatted}</div>
    },
  },
  {
    id: "Actions",
    cell: ({ row }) => {
      const payment = row.original
 
      return (
        <Dialog>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {/* <DialogTrigger asChild>
              <DropdownMenuItem>          
                  Book Ticket
              </DropdownMenuItem>
            </DialogTrigger> */}
            <DropdownMenuItem>
              View Seat
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DialogContentFull>
          <DialogHeader>
            <DialogTitle className="pl-6">Sell Ticket</DialogTitle>
          </DialogHeader>
        </DialogContentFull>
        </Dialog>
      )
    },
  }
]
