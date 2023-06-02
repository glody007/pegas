"use client"

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
import { Bus } from '@/lib/validators/bus';
import { FileIcon, MoreVertical, PrinterIcon } from 'lucide-react';
import { TicketFull } from "@/lib/validators/ticket"
import { format } from "date-fns" 
import { TicketMiniFront } from "./TicketMiniFront"
import { Button } from "./ui/button";

interface TicketMiniFrontProps {
    ticket: TicketFull
}

export function TicketRow({ ticket }: TicketMiniFrontProps) {

  return (
    <div className="flex">
        <TicketMiniFront ticket={ticket} />
        <div className="flex">
        <Dialog>
            <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreVertical className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DialogTrigger asChild>
                    <DropdownMenuItem>
                        <PrinterIcon />
                        Imprimer
                    </DropdownMenuItem>
                </DialogTrigger>
                <DropdownMenuItem>
                    <FileIcon />
                    Dowload PDF
                </DropdownMenuItem>
                <DropdownMenuItem className="text-red-500">
                    Annuler
                </DropdownMenuItem>
            </DropdownMenuContent>
            </DropdownMenu>

            <DialogContentFull>
            <DialogHeader>
                <DialogTitle className="pl-6"></DialogTitle>
            </DialogHeader>
            <div className="min-w-[300px]">
                
            </div>  
            </DialogContentFull>
        </Dialog>
        </div>
    </div>
  )
}
