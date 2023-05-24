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
  coach: string
  boarding: string
  contact: string
  from: string
  to: string
  pnr: string
  departure: Date
  seat: string
  type: string
  price: number
  status: "pending" | "processing" | "success" | "failed"
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
          Coach
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const coach: String = row.getValue("coach")
      return <div className="text-lg">{coach}</div>
    },
  },
  {
    accessorKey: "from",
    header: "From",
  },
  {
    accessorKey: "to",
    header: "To",
  },
  {
    accessorKey: "departure",
    header: () => <div className="text-center">Departure</div>,
    cell: ({ row }) => {
      const boarding: Date = row.original.departure

      const date = format(boarding, 'dd/MM/yyyy')
      const boardingTime = format(boarding, 'HH:mm:ss')
 
      return (
        <div className="flex flex-col items-center justify-center">
          <div className="text-gray-500 text-xs">
            {date}
          </div>
          <div>
            {boardingTime}
          </div>
        </div>
      )
    },
  },
  {
    accessorKey: "boarding",
    header: "Boarding",
  },
  {
    accessorKey: "seat",
    header: "Seat",
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
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "contact",
    header: "Contact",
  },
  {
    accessorKey: "pnr",
    header: "PNR",
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
            <DialogTrigger asChild>
              <DropdownMenuItem>          
                  Edit
              </DropdownMenuItem>
            </DialogTrigger>
            <DropdownMenuItem className="text-red-500">
              Cancel
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DialogContentFull>
          <DialogHeader>
            <DialogTitle className="pl-6">Edit</DialogTitle>
          </DialogHeader>
           
        </DialogContentFull>
        </Dialog>
      )
    },
  }
]
