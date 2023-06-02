import React, { useState } from 'react';
import Image from 'next/image';
import { format } from "date-fns"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
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
import { MoreVertical } from 'lucide-react';
import { ScheduleFull } from '@/lib/validators/schedule';
import { SellReserve } from './SellReserve';
import { scheduleTravelTime, ticketPrice } from '@/lib/utils';
import { TicketFull } from '@/lib/validators/ticket';

interface ManifestCardProps {
    schedule: ScheduleFull
}

const ManifestCard: React.FC<ManifestCardProps> = ({ schedule }) => {
    const [openModal, setOpenModal] = useState(false)

    const start = new Date(schedule.start)
    const end = new Date(schedule.end)

    const handleSuccess = (ticket: TicketFull) => {
        setOpenModal(false)
        console.log(ticket)
    }

    return (
        <Card>
            <CardContent className="flex mt-4 space-x-4">
                <div className="flex-[0.6] flex flex-col">
                    <div className="text-xs text-gray-500 mt-2">
                        Bus | driver
                    </div>
                    <div className="flex space-x-2 mt-2">
                        <Badge variant="secondary">{schedule.bus.name}</Badge>
                        <Badge variant="secondary">{schedule.driver.name}</Badge> 
                    </div>
                    <div className="text-xs text-gray-500 mt-2">
                        Date
                    </div>
                    <div className="flex space-x-2">
                        <Badge variant="secondary">{format(start, "dd/MM/yyyy")}</Badge>
                    </div>
                    <div className="text-xs text-gray-500 mt-2">
                        Start - End
                    </div>
                    <div className="flex space-x-2 mt-2">
                        <Badge variant="secondary">{format(start, "HH:mm")}-{format(end, "HH:mm")}</Badge>
                    </div>
                </div>
                <div className="flex-[0.6] flex flex-col justify-between">
                    <div className="mt-2">
                        <div className="text-xs text-gray-500">Route | Prix</div>
                        <div className="mt-1 flex space-x-2">
                            <Badge variant="secondary">{schedule.route.from}-{schedule.route.to}</Badge> 
                            <Badge variant="secondary">{ticketPrice(schedule)}$</Badge> 
                        </div>
                        <div className="text-xs text-gray-500 mt-2">Duration</div>
                        <div className="mt-1">
                            <Badge variant="secondary">{scheduleTravelTime(schedule)}</Badge> 
                        </div>
                        <div className="text-xs text-gray-500 mt-2">Number of seats | Class</div>
                        <div className="mt-1 flex space-x-2">
                            <Badge variant="secondary">{schedule.bus.numberOfSeats}</Badge> 
                            <Badge variant={schedule.bus.class.name === "vip" ? "default" : "secondary"}>
                                {schedule.bus.class.name}
                            </Badge>
                        </div>
                    </div>
                </div>
                <div className="flex-1 flex flex-col">
                    <div className="relative flex-1 border border-zinc-100 flex flex-col justify-between rounded-xs mt-2 p-4">
                        <Image fill src={schedule.bus.photoUrl} alt="Bus image" />
                    </div>
                </div>

                <div className="flex-[0.5] flex flex-col justify-between">
                    <div className="flex-1 flex flex-col justify-between items-end mt-2">
                    <Dialog open={openModal} onOpenChange={setOpenModal}>
                            <DialogTrigger asChild>
                                <Button>
                                    Sell ticket
                                </Button>
                            </DialogTrigger>
                            <DialogContentFull>
                                <DialogHeader>
                                    <DialogTitle className="pl-6"></DialogTitle>
                                </DialogHeader>
                                <div className="min-w-[300px]">
                                    <SellReserve schedule={schedule} handleSuccess={handleSuccess} />
                                </div>  
                            </DialogContentFull>
                        </Dialog>
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
                                        Book ticket
                                    </DropdownMenuItem>
                                </DialogTrigger>
                                <DropdownMenuItem>
                                    View seat
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    Manifest
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                            </DropdownMenu>

                            <DialogContentFull>
                            <DialogHeader>
                                <DialogTitle className="pl-6"></DialogTitle>
                            </DialogHeader>
                            <div className="min-w-[300px]">
                                <SellReserve schedule={schedule} />
                            </div>  
                            </DialogContentFull>
                        </Dialog>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default ManifestCard;
