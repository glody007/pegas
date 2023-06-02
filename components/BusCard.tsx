import React from 'react';
import Image from 'next/image';
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
import { Bus } from '@/lib/validators/bus';
import { MoreVertical } from 'lucide-react';
import BusForm from './form/BusForm';
import { Class } from '@/lib/validators/class';

interface BusCardProps {
    bus: Bus,
    classes?: Class[]
}

const BusCard: React.FC<BusCardProps> = ({ bus, classes }) => {
    return (
        <Card>
            <CardContent className="flex mt-4 h-40 space-x-4">
                <div className="flex-[0.2] flex flex-col justify-between">
                    <div className="flex">
                        <h2 className="text-lg font-bold">{bus.name}</h2>
                    </div>
                    <div className="">
                        <div className="text-xs text-gray-500">Brand</div>
                        <div className="mt-1">
                            <Badge variant="secondary">{bus.brand}</Badge> 
                        </div>
                        <div className="text-xs text-gray-500 mt-2">Number of seats</div>
                        <div className="mt-1">
                            <Badge>{bus.numberOfSeats}</Badge> 
                        </div>
                    </div>
                </div>
                <div className="flex-[0.5] flex flex-col">
                    <div className="relative flex-1 border border-zinc-100 flex flex-col justify-between rounded-xs mt-2 p-4">
                        <Image fill src={bus.photoUrl} alt="Bus image" />
                    </div>
                </div>
                <div className="flex-1 flex flex-col">
                    <div className="flex-1 bg-gray-100 flex flex-col justify-between rounded-xs mt-2 p-4">
                        <div className="text-xs">
                            GPS and internet are unavailable, last location Lubumbashi 
                        </div>
                        <div className="text-xs text-gray-500">
                            More details
                        </div>
                    </div>
                </div>
                <div className="flex flex-col justify-between">
                    <div className="flex justify-end">
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
                                        Edit
                                    </DropdownMenuItem>
                                </DialogTrigger>
                                <DropdownMenuItem className="text-red-500">
                                    Remove
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                            </DropdownMenu>

                            <DialogContentFull>
                            <DialogHeader>
                                <DialogTitle className="pl-6"></DialogTitle>
                            </DialogHeader>
                            <div className="min-w-[300px]">
                                <BusForm classes={classes || []} /> 
                            </div>  
                            </DialogContentFull>
                        </Dialog>
                    </div>
                    <div className="flex justify-end">
                        <Button variant="outline">Seat plan</Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default BusCard;
