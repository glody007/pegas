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
  coach: string
  boarding: Date
  dropping: Date
  type: string
  route: string
  manifest: string
  available: number
  price: number
  status: "pending" | "processing" | "success" | "failed"
  view: string
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
    accessorKey: "time",
    header: () => <div className="text-center">Time</div>,
    cell: ({ row }) => {
      const boarding: Date = row.original.boarding
      const dropping: Date = row.original.dropping

      const date = format(boarding, 'dd/MM/yyyy')
      const boardingTime = format(boarding, 'HH:mm:ss')
      const droppingTime = format(dropping, 'HH:mm:ss')
 
      return (
        <div className="flex flex-col items-center justify-center">
          <div className="text-gray-500 text-xs">
            {date}
          </div>
          <div>
            {boardingTime} - {droppingTime}
          </div>
        </div>
      )
    },
  },
  {
    accessorKey: "type",
    header: "Type",
  },
  {
    accessorKey: "route",
    header: "Route",
  },
  {
    accessorKey: "available",
    header: "Available",
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
            <DialogTrigger asChild>
              <DropdownMenuItem>          
                  Book Ticket
              </DropdownMenuItem>
            </DialogTrigger>
            <DropdownMenuItem>
              View Seat
            </DropdownMenuItem>
            <DropdownMenuItem>
              Manifest
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DialogContentFull>
          <DialogHeader>
            <DialogTitle className="pl-6">Sell Ticket</DialogTitle>
          </DialogHeader>
          <SellReserve />   
        </DialogContentFull>
        </Dialog>
      )
    },
  }
]
