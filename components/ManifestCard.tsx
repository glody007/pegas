import React from 'react';
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

interface ManifestCardProps {
    schedule: ScheduleFull
}

const ManifestCard: React.FC<ManifestCardProps> = ({ schedule }) => {
    const start = new Date(schedule.start)
    const end = new Date(schedule.end)
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
                            <Badge variant="secondary">20$</Badge> 
                        </div>
                        <div className="text-xs text-gray-500 mt-2">Duration</div>
                        <div className="mt-1">
                            <Badge variant="secondary">8h</Badge> 
                        </div>
                        <div className="text-xs text-gray-500 mt-2">Number of seats</div>
                        <div className="mt-1">
                            <Badge variant="secondary">{schedule.bus.numberOfSeats}</Badge> 
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
                    <Dialog>
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
                                    <SellReserve />
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
                                <SellReserve />
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
