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
import { Schedule } from "@/lib/validators/schedule"

interface ScheduleListProps {
  data: Array<Schedule>
}

const  ScheduleList: React.FC<ScheduleListProps> = ({ data }) => {
    const [busName, setBusName] = useState("")
    const [driverName, setDriverName] = useState("")

    const filteredData = data.filter(schedule => (
      String(schedule.driverId).toLowerCase().includes(driverName.toLowerCase()) &&
      String(schedule.busId).toLowerCase().includes(busName.toLowerCase()) 
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
                      New bus
                    </Button>
                  </DialogTrigger>
                  <DialogContentFull>
                    <DialogHeader>
                      <DialogTitle>New bus</DialogTitle>
                      <DialogDescription>
                        Fill the bus form. Click save when you're done.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="mt-4">
                      <BusForm />
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