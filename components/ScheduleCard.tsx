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
import BusForm from './form/BusForm';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Route } from '@/lib/validators/route';
import { User } from '@/lib/validators/user';
import { Schedule } from '@/lib/validators/schedule';

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
            plan: {
                id: 1,
                seatsConfig: "A1 A2"
            },
            numberOfSeats: 60,
            photoUrl: "https://ik.imagekit.io/vbjy0pcazvn/yutong_nfKWGHAMY.jpeg?updatedAt=1685336064650"
        },
        {
            id: 1,
            name: "H-3",
            brand: "Higer bus",
            plan: {
                id: 1,
                seatsConfig: "A1 A2"
            },
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
        id: 1,
        from: "Lubumbashi",
        to: "Likasi",
        duration: "3 hours",
        places: ["Lubumbashi", "Kambove", "Likasi"]
      },
      {
        id: 2,
        from: "Lubumbashi",
        to: "Kolwezi",
        duration: "6 hours",
        places: ["Lubumbashi", "Kambove", "Likasi", "Kolwezi"]
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
                <div className="flex flex-col justify-between">
                    <div className="text-xs text-gray-500 text-center mt-2">
                        Bus | Date | Start-End
                    </div>
                    <div className="flex space-x-2">
                        <Badge>{bus.name} | {format(schedule.start, "dd/MM/yyyy")} | {format(schedule.start, "HH:mm")}-{format(schedule.end, "HH:mm")}</Badge>
                    </div>
                    <div className="flex flex-col items-center">
                        <Avatar>
                            <AvatarImage src="https://github.com/shadcn.png" />
                            <AvatarFallback>{driver.name[0]}</AvatarFallback>
                        </Avatar>
                        <div className="text-xs text-gray-500 mt-2">Driver</div>
                        <div className="mt-1">
                            <Badge variant="secondary">{driver.name}</Badge> 
                        </div>
                    </div>
                </div>
                <div className="flex flex-col justify-between">
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
                <div className="flex-[0.5] flex flex-col">
                    <div className="relative flex-1 border border-zinc-100 flex flex-col justify-between rounded-xs mt-2 p-4">
                        <Image fill src={bus.photoUrl} alt="Bus image" />
                    </div>
                </div>
                <div className="flex-1 flex flex-col">
                <div className="relative flex-1 flex flex-col justify-center">
                        <div className="absolute top-[46%] w-full flex h-2 rounded-xl bg-blue-200" />
                        <div className="z-50 flex justify-between items-center">
                            {route.places.map((place, index) => (
                                <div className="relative bg-blue-200 rounded-full">
                                    <div className="m-2 w-8 h-8 text-white flex items-center justify-center bg-blue-400 rounded-full">
                                        {index + 1}
                                    </div>
                                    <div className="absolute flex text-xs text-gray-400">
                                        {place}
                                    </div>
                                </div>
                            ))}
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
                                <BusForm /> 
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
