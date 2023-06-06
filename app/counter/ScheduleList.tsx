"use client"

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
import React, { useState } from "react"
import { Input } from "@/components/ui/input"
import { Schedule, ScheduleFull } from "@/lib/validators/schedule"
import { useQuery } from "react-query"
import { allRoutes } from "@/service/route"
import { allBuses } from "@/service/bus"
import { allUsers } from "@/service/user"
import { SkeletonTable } from "@/components/SkeletonTable"
import { Bus } from "@/lib/validators/bus"
import { Route } from "@/lib/validators/route"
import { RoleSchema, User } from "@/lib/validators/user"
import { allSchedules } from "@/service/schedule"
import { SellReserve } from "@/components/SellReserve"
import ManifestCard from "@/components/ManifestCard"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { cn, dateAreEquals } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { Ticket, TicketFull } from "@/lib/validators/ticket"
import { TicketDetails } from "@/components/TicketDetails"

interface ScheduleListProps {
  
}

const  ScheduleList: React.FC<ScheduleListProps> = ({ }) => {
    const [from, setFrom] = useState("")
    const [to, setTo] = useState("")
    const [date, setDate] = useState<Date | undefined>(undefined)
    const [openModal, setOpenModal] = useState(false)

    const { data: responseRoute, error: errorRoute, isLoading: isLoadingRoute } = useQuery({
      queryFn: allRoutes,
      queryKey: ["routes"],
    })

    const { data: responseBus, error: errorBus, isLoading: isLoadingBus } = useQuery({
      queryFn: allBuses,
      queryKey: ["buses"]
    })

    const { data: responseUser, error: errorUser, isLoading: isLoadingUser } = useQuery({
      queryFn: allUsers,
      queryKey: ["users"]
    })

    const { data: responseSchedule, error: errorSchedule, isLoading: isLoadingSchedule } = useQuery({
      queryFn: allSchedules,
      queryKey: ["schedules"]
    })

    const isLoading = isLoadingBus || isLoadingRoute || isLoadingUser || isLoadingSchedule
    const error = errorBus || errorRoute || errorUser || errorSchedule

    if(error) return <>error...</>

    if(isLoading) return <SkeletonTable />

    const buses: Bus[] = responseBus.data
    const routes: Route[] = responseRoute.data
    const users: User[] = responseUser.data
    const schedules: ScheduleFull[] = responseSchedule.data
    const drivers = users.filter(user => user.role === RoleSchema.enum.driver)

    const filteredData = schedules.filter(schedule => (
      String(schedule.route.from).toLowerCase().includes(from.toLowerCase()) &&
      String(schedule.route.to).toLowerCase().includes(to.toLowerCase()) &&
      (!date || dateAreEquals(new Date(schedule.start), date))
    ))

    const handleSelectDate = (selected: Date | undefined) => {
        if(dateAreEquals(date || new Date(1223), selected || new Date(1223))) {
          setDate(undefined)
        }
        setDate(selected as Date)
    }

    const handleSuccess = () => {
      setOpenModal(false)
    }

    return (
      <>
            <div className="flex items-center justify-between py-4 space-x-8">
              <div className="flex space-x-8">
                <Input
                  placeholder="Origine..."
                  value={from}
                    onChange={(event) => setFrom(event.target.value)
                  }
                  className="max-w-sm"
                />
                <Input
                  placeholder="Destination..."
                  value={to}
                  onChange={(event) => setTo(event.target.value)
                  }
                  className="max-w-sm"
                />
                <Popover>
                    <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                              "w-full pl-3 text-left font-normal",
                              !date && "text-muted-foreground"
                          )}
                        >
                          {date ? (
                              format(date, "PPP")
                          ) : (
                              <span>Date...</span>
                          )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                        mode="single"
                        selected={date}
                        onSelect={handleSelectDate}
                        disabled={(date) =>
                            date < new Date()
                        }
                        initialFocus
                    />
                    </PopoverContent>
                </Popover>
              </div>
                
              </div>
              <div className="rounded-md space-y-4">
                {filteredData.map(schedule => (
                  <ManifestCard key={schedule.id} schedule={schedule} />
                ))}
              </div>
              {filteredData.length === 0 && (
                <div className="mt-20 flex justify-center items-center">
                  <p className="p-4 rounded bg-red-100 text-lg">Pas de resultat pour cette recherche</p>
                </div>
              )}
        </>
    )
}

export default ScheduleList;