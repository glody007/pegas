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
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { PlusIcon } from "lucide-react"
import BusForm from "@/components/form/BusForm"
import ScheduleCard from "@/components/ScheduleCard"
import { Schedule, ScheduleFull } from "@/lib/validators/schedule"
import ScheduleForm from "@/components/form/ScheduleForm"
import { useQuery } from "react-query"
import { allRoutes } from "@/service/route"
import { allBuses } from "@/service/bus"
import { allUsers } from "@/service/user"
import { SkeletonTable } from "@/components/SkeletonTable"
import { Bus } from "@/lib/validators/bus"
import { Route } from "@/lib/validators/route"
import { RoleSchema, User } from "@/lib/validators/user"
import { allSchedules } from "@/service/schedule"

interface ScheduleListProps {
  data: Array<Schedule>
}

const  ScheduleList: React.FC<ScheduleListProps> = ({ data }) => {
    const [busName, setBusName] = useState("")
    const [driverName, setDriverName] = useState("")

    const { data: responseRoute, error: errorRoute, isLoading: isLoadingRoute } = useQuery({
      queryFn: allRoutes,
      queryKey: ["routes"]
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
      String(schedule.driver.name).toLowerCase().includes(driverName.toLowerCase()) &&
      String(schedule.bus.name).toLowerCase().includes(busName.toLowerCase()) 
    ))

    return (
      <>
            <div className="flex items-center justify-between py-4 space-x-8">
              <div className="flex space-x-8">
                <Input
                  placeholder="Filter driver name..."
                  value={driverName}
                    onChange={(event) => setDriverName(event.target.value)
                  }
                  className="max-w-sm"
                />
                <Input
                  placeholder="Filter bus name..."
                  value={busName}
                  onChange={(event) => setBusName(event.target.value)
                  }
                  className="max-w-sm"
                />
              </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>
                      <PlusIcon />
                      New schedule
                    </Button>
                  </DialogTrigger>
                  <DialogContentFull>
                    <DialogHeader>
                      <DialogTitle>New schedule</DialogTitle>
                      <DialogDescription>
                        Fill the bus form. Click save when you're done.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="mt-4">
                      <ScheduleForm buses={buses} routes={routes} drivers={drivers} />
                    </div>
                  </DialogContentFull>
                </Dialog>
              </div>
              <div className="rounded-md space-y-4">
                {filteredData.map(schedule => (
                  <ScheduleCard schedule={schedule} />
                ))}
              </div>
        </>
    )
}

export default ScheduleList;