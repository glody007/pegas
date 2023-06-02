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
import { Bus } from '@/lib/validators/bus';
import { MoreVertical } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Route } from '@/lib/validators/route';
import { User } from '@/lib/validators/user';
import { Role } from '@/lib/validators/user';
import { Schedule, ScheduleFull } from '@/lib/validators/schedule';
import ScheduleForm from './form/ScheduleForm';
import { scheduleTravelTime } from '@/lib/utils';

interface ScheduleCardProps {
    schedule: ScheduleFull
}

const ScheduleCard: React.FC<ScheduleCardProps> = ({ schedule }) => {
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
                        <div className="text-xs text-gray-500">Route</div>
                        <div className="mt-1">
                            <Badge variant="secondary">{schedule.route.from}-{schedule.route.to}</Badge> 
                        </div>
                        <div className="text-xs text-gray-500 mt-2">Duration</div>
                        <div className="mt-1">
                            <Badge variant="secondary">{scheduleTravelTime(schedule)}</Badge> 
                        </div>
                        <div className="text-xs text-gray-500 mt-2">Nombre des sieges</div>
                        <div className="mt-1">
                            <Badge variant="secondary">{schedule.bus.numberOfSeats}</Badge> 
                        </div>
                    </div>
                </div>
                <div className="flex-1 flex flex-col">
                    <div className="relative flex-1 border border-zinc-100 flex flex-col justify-between rounded-xs mt-2 p-4">
                        <Image fill objectFit="contain" src={schedule.bus.photoUrl} alt="Bus image" />
                    </div>
                </div>

                <div className="flex-[0.5] flex flex-col justify-between">
                    <div className="flex-1 flex flex-col justify-center items-center mt-2">
                        <div className="p-8 bg-blue-100 rounded-full">
                            <Avatar>
                                <AvatarImage src={schedule.driver.photo} />
                                <AvatarFallback>{schedule.driver.name[0]}</AvatarFallback>
                            </Avatar>
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
                                
                            </div>  
                            </DialogContentFull>
                        </Dialog>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default ScheduleCard;
