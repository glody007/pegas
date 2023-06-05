"use client"

import React, { useState } from "react"
import { ScheduleFull } from "@/lib/validators/schedule"
import { useQuery } from "react-query"
import { allSchedules } from "@/service/schedule"
import ManifestCard from "@/components/ManifestCard"
import { cn, dateAreEquals } from "@/lib/utils"
import { SkeletonCard } from "@/components/SkeletonCard"
import SheduleCardForCustomer from "@/components/ScheduleCardForCustomer"

interface ScheduleListProps {
  from: string,
  to: string,
  date: Date
}

const  ScheduleList: React.FC<ScheduleListProps> = ({ from, to, date }) => {


    const { data: responseSchedule, error: errorSchedule, isLoading: isLoadingSchedule } = useQuery({
      queryFn: allSchedules,
      queryKey: ["schedules"]
    })

    const isLoading = isLoadingSchedule
    const error = errorSchedule

    if(error) return <>error...</>

    if(isLoading) return <SkeletonCard />

    const schedules: ScheduleFull[] = responseSchedule.data

    const filteredData = schedules.filter(schedule => (
      (from !== ""  || String(schedule.route.from).toLowerCase().includes(from.toLowerCase())) &&
      (to !== ""  || String(schedule.route.to).toLowerCase().includes(to.toLowerCase())) &&
      (!date || dateAreEquals(new Date(schedule.start), date))
    ))

    return (
      <>
          <p className="text-xl font-semibold">
            Resultats: {filteredData.length} bus trouvés
          </p>
          <div className="rounded-md space-y-4">
            {filteredData.map(schedule => (
                <SheduleCardForCustomer schedule={schedule} />
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