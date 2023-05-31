import React from "react"
import ScheduleList  from "./ScheduleList"
import { Schedule } from "@/lib/validators/schedule"

async function getData(): Promise<Schedule[]> {
    // Fetch data from your API here.
    return [
      {
        id: "1",
        start: new Date(2023, 5, 30, 7, 45),
        end: new Date(2023, 5, 30, 15, 0),
        busId: "1",
        routeId: "1",
        driverId: "1"
      },
      {
        id: "2",
        start: new Date(2023, 6, 10, 14, 0),
        end: new Date(2023, 6, 10, 20, 0),
        busId: "2",
        routeId: "2",
        driverId: "2"
      },
    ]
} 

export default async function Departure() {
    const data = await getData()

    return (
        <div className="mx-auto mt-4">
            <ScheduleList data={data} />
        </div>
    )
}