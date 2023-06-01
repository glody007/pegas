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
import { Bus } from "@/lib/validators/bus"
import BusCard from "@/components/BusCard"
import BusForm from "@/components/form/BusForm"
import { useQuery } from "react-query"
import { SkeletonTable } from "@/components/SkeletonTable"
import { allBuses } from "@/service/bus"

interface FleetProps {

}

const  BusList = ({ }: FleetProps) => {
    const [name, setName] = useState("")
    const [brand, setBrand] = useState("")
    const [openModal, setOpenModal] = useState(false)

    const { data: response, error, isLoading } = useQuery({
      queryFn: allBuses,
      queryKey: ["buses"]
    })

    if(error) return <>error...</>

    if(isLoading) return <SkeletonTable />

    const buses: Bus[] = response.data
    const filteredData = buses.filter(bus => (
      bus.name.toLowerCase().includes(name.toLowerCase()) &&
      bus.brand.toLowerCase().includes(brand.toLowerCase()) 
    ))

    const handleSuccess = () => {
      setOpenModal(false)
    }

    return (
      <>
            <div className="flex items-center justify-between py-4 space-x-8">
              <div className="flex space-x-8">
                <Input
                  placeholder="Filter name..."
                  value={name}
                    onChange={(event) => setName(event.target.value)
                  }
                  className="max-w-sm"
                />
                <Input
                  placeholder="Filter brand..."
                  value={brand}
                  onChange={(event) => setBrand(event.target.value)
                  }
                  className="max-w-sm"
                />
              </div>
                <Dialog open={openModal} onOpenChange={setOpenModal}>
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
                      <BusForm handleSuccess={handleSuccess} />
                    </div>
                  </DialogContentFull>
                </Dialog>
              </div>
              <div className="rounded-md space-y-4">
                {filteredData.map(bus => (
                  <BusCard bus={bus} />
                ))}
              </div>
        </>
    )
}

export default BusList;