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
import { Schedule } from '@/lib/validators/schedule';
import ScheduleForm from './form/ScheduleForm';

interface ScheduleCardProps {
    schedule: Schedule
}

function getUser(id: number): User {
    const users = [
        {
            id: "1",
            name: "Namy",
            email: "marco@gmail.com",
            sex: "F",
            birthday: new Date(),
            role: "driver"
        },
        {
            id: "2",
            name: "Marco",
            email: "marco@gmail.com",
            sex: "M",
            birthday: new Date(),
            role: "driver"
        },
    ]
    return users[id-1]
}

function getBus(id: number): Bus {
    const buses = [
        {
            id: 1,
            name: "Y-49",
            brand: "Yuton bus",
            planId: "12",
            numberOfSeats: 60,
            photoUrl: "https://ik.imagekit.io/vbjy0pcazvn/yutong_nfKWGHAMY.jpeg?updatedAt=1685336064650"
        },
        {
            id: 1,
            name: "H-3",
            brand: "Higer bus",
            planId: "21",
            numberOfSeats: 40,
            photoUrl: "https://ik.imagekit.io/vbjy0pcazvn/higer_XB13xgbMH.png?updatedAt=1685336064695"
        }
    ]
    return buses[id-1]
}

function getRoute(id: number): Route {
    // Fetch data from your API here.
    const routes = [
      {
        id: "1",
        from: "Lubumbashi",
        to: "Likasi",
        duration: 180,
        stops: ["Lubumbashi", "Kambove", "Likasi"]
      },
      {
        id: "2",
        from: "Lubumbashi",
        to: "Kolwezi",
        duration: 360,
        stops: ["Lubumbashi", "Kambove", "Likasi", "Kolwezi"]
      },
    ]
    return routes[id-1]
}

const ScheduleCard: React.FC<ScheduleCardProps> = ({ schedule }) => {
    const route = getRoute(schedule.routeId)
    const driver = getUser(schedule.driverId)
    const bus = getBus(schedule.busId)

    return (
        <Card>
            <CardContent className="flex mt-4 space-x-4">
                

                <div className="flex-[0.6] flex flex-col">
                    <div className="text-xs text-gray-500 mt-2">
                        Bus | driver
                    </div>
                    <div className="flex space-x-2 mt-2">
                        <Badge variant="secondary">{bus.name}</Badge>
                        <Badge variant="secondary">{driver.name}</Badge> 
                    </div>
                    <div className="text-xs text-gray-500 mt-2">
                        Date
                    </div>
                    <div className="flex space-x-2">
                        <Badge variant="secondary">{format(schedule.start, "dd/MM/yyyy")}</Badge>
                    </div>
                    <div className="text-xs text-gray-500 mt-2">
                        Start - End
                    </div>
                    <div className="flex space-x-2 mt-2">
                        <Badge variant="secondary">{format(schedule.start, "HH:mm")}-{format(schedule.end, "HH:mm")}</Badge>
                    </div>
                </div>
                <div className="flex-[0.6] flex flex-col justify-between">
                    <div className="mt-2">
                        <div className="text-xs text-gray-500">Route</div>
                        <div className="mt-1">
                            <Badge variant="secondary">{route.from}-{route.to}</Badge> 
                        </div>
                        <div className="text-xs text-gray-500 mt-2">Duration</div>
                        <div className="mt-1">
                            <Badge variant="secondary">8h</Badge> 
                        </div>
                        <div className="text-xs text-gray-500 mt-2">Number of seats</div>
                        <div className="mt-1">
                            <Badge variant="secondary">{bus.numberOfSeats}</Badge> 
                        </div>
                    </div>
                </div>
                <div className="flex-1 flex flex-col">
                    <div className="relative flex-1 border border-zinc-100 flex flex-col justify-between rounded-xs mt-2 p-4">
                        <Image fill src={bus.photoUrl} alt="Bus image" />
                    </div>
                </div>

                <div className="flex-[0.5] flex flex-col justify-between">
                    <div className="flex-1 flex flex-col justify-center items-center mt-2">
                        <div className="p-8 bg-blue-100 rounded-full">
                            <Avatar>
                                <AvatarImage src="https://github.com/shadcn.png" />
                                <AvatarFallback>{driver.name[0]}</AvatarFallback>
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
                                <ScheduleForm /> 
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
