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
import DepartureForm from "@/components/form/departure-form"
import RouteCard from "@/components/route-card"
import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { PlusIcon } from "lucide-react"
import RouteForm from "@/components/form/route-form"
import { Route } from "@/lib/validators/route"
import axios from "axios"
import { useQuery } from "react-query"
import { SkeletonTable } from "@/components/SkeletonTable"

interface RouteListProps {
  data: Array<Route>
}

const allRoutes = async () => {
  const response = await axios.get("/api/routes/getRoutes")
  return response.data
}

export default function RouteList({ data }: RouteListProps) {
    const [from, setFrom] = useState("")
    const [to, setTo] = useState("")

    const { data: response, error, isLoading } = useQuery({
      queryFn: allRoutes,
      queryKey: ["routes"]
    })

    if(error) return <>Error</>

    if(isLoading) return <SkeletonTable />

    const filteredData = data.filter(route => (
      route.from.toLowerCase().includes(from.toLowerCase()) &&
      route.to.toLowerCase().includes(to.toLowerCase())
    ))

    return (
      <>
            <div className="flex items-center justify-between py-4 space-x-8">
              <div className="flex space-x-8">
                <Input
                  placeholder="Filter from..."
                  value={from}
                  onChange={(event) => setFrom(event.target.value)
                  }
                  className="max-w-sm"
                />
                <Input
                  placeholder="Filter to..."
                  value={to}
                  onChange={(event) => setTo(event.target.value)
                  }
                  className="max-w-sm"
                />
              </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>
                      <PlusIcon />
                      New route
                    </Button>
                  </DialogTrigger>
                  <DialogContentFull>
                    <DialogHeader>
                      <DialogTitle>New route</DialogTitle>
                      <DialogDescription>
                        Fill the departure form. Click save when you're done.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="mt-4">
                      <RouteForm />
                    </div>
                  </DialogContentFull>
                </Dialog>
              </div>
              <div className="rounded-md space-y-4">
                {filteredData.map(route => (
                  <RouteCard route={route} />
                ))}
              </div>
        </>
    )
}