"use client"

import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
    SelectLabel,
    SelectGroup
} from "@/components/ui/select"
import { cn, ticketPrice } from "@/lib/utils"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import SeatsPreview from "./SeatsPreview"
import { Badge } from "@/components/ui/badge"
import { ScheduleFull } from "@/lib/validators/schedule"
import { Ticket, TicketFull, TicketSchema } from "@/lib/validators/ticket"
import { useMutation, useQueryClient } from "react-query"
import axios, { AxiosError } from "axios"
import toast from "react-hot-toast"
import { useState } from "react"
  

interface SellReserveProps {
    schedule: ScheduleFull,
    handleSuccess?: (ticket: TicketFull) => void
}

export function SellReserve({ schedule, handleSuccess }: SellReserveProps) {
  const [isDisabled, setIsDisabled] = useState(false)
  let toastAddId: string

  const queryClient = useQueryClient()

  const start = new Date(schedule.start)
  const end = new Date(schedule.end)

  const form = useForm<Ticket>({
    resolver: zodResolver(TicketSchema),
    defaultValues: {
        seat: "",
        email: "",
        name: "",
        scheduleId: schedule.id 
    },
  })

  const {mutate} = useMutation(
    async (ticket: Ticket) => await axios.post('/api/tickets/buyTicket', ticket),
    {
        onError: (error) => {
            if(error instanceof AxiosError) {
                toast.error(error?.response?.data.errors[0].message, {id: toastAddId})
            }
            setIsDisabled(false)
        },
        onSuccess: (response) => {
            toast.success("Achat effectué avec succès👏", { id: toastAddId })
            setIsDisabled(false)
            queryClient.invalidateQueries(["schedules", "tickets"])
            if(handleSuccess) handleSuccess(response.data.data)
        }
    }
  )

  function onSubmit(values: Ticket) {
    toastAddId = toast.loading("Achat en cours", { id: toastAddId })
    setIsDisabled(true)
    mutate(values)
  }

  return (
    <div>
        <CardHeader>
            <div className="flex space-x-8">
                <div>
                    <p className="text-xs text-zinc-500">Route</p>
                    <p className="text-xl text-blue-500">{schedule.route.from}-{schedule.route.to}</p>
                </div>
                <div>
                    <p className="text-xs text-zinc-500">Bus</p>
                    <p className="text-xl">{schedule.bus.name} | {schedule.bus.class.name.toUpperCase()}</p>
                </div>
                <div>
                    <p className="text-xs text-zinc-500">Date</p>
                    <p className="text-xl">{format(start, "dd/MM/yyyy")}</p>
                </div>
                <div>
                    <p className="text-xs text-zinc-500">Heure</p>
                    <p className="text-xl">{format(start, "HH:mm")}</p>
                </div>
                <div>
                    <p className="text-xs text-zinc-500">Sieges libres</p>
                    <p className="text-xl">{schedule.availableSeats}</p>
                </div>
            </div>
        </CardHeader>
        <CardContent>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex space-x-8 mt-4">
                    <div>
                        <SeatsPreview />
                    </div>
                    <div className="flex-1 flex-col space-y-8">
                        {/* START PASSSENGER DETAILS */}
                        <Card className="flex flex-col">
                            <CardHeader>
                                <h2 className="font-semibold">Details du passager</h2>
                            </CardHeader>
                            <CardContent>
                                <div className="flex space-x-4">
                                    <div>
                                        <FormField
                                            control={form.control}
                                            name="seat"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Siege</FormLabel>
                                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                        <FormControl>
                                                            <SelectTrigger>
                                                                <SelectValue placeholder="Select seat" />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent>
                                                            <SelectItem value="A1">A1</SelectItem>
                                                            <SelectItem value="A2">A3</SelectItem>
                                                            <SelectItem value="A3">A5</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <div>
                                        <FormField
                                            control={form.control}
                                            name="email"
                                            render={({ field }) => (
                                                <FormItem>
                                                <FormLabel>Email</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="marco@zoan.com" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <div>
                                        <FormField
                                            control={form.control}
                                            name="name"
                                            render={({ field }) => (
                                                <FormItem>
                                                <FormLabel>Name</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Edward New Gate" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <div>
                                        <FormLabel>Amount</FormLabel>
                                        <div className="flex justify-center mt-4">
                                            <Badge variant="secondary">
                                                {ticketPrice(schedule)} $
                                            </Badge>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                        {/* END PASSSENGER DETAILS */}

                        <div className="flex-1 flex space-x-8">
                            {/* START STOPPAGE */}
                            <Card className="flex-1 flex flex-col">
                                <CardHeader>
                                    <h2 className="font-semibold">Details du trajet</h2>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex justify-between items-center space-x-8">
                                        <FormLabel>Départ:</FormLabel>
                                        <div className="flex-[0.7] flex justify-end min-w-[240px] p-2 border bg-zinc-100">
                                            {schedule.route.from} - {format(start, "HH:mm")}
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-center space-x-8 mt-2">
                                        <FormLabel>Arrivée</FormLabel>
                                        <div className="flex-[0.7] flex justify-end min-w-[240px] p-2 border bg-zinc-100">
                                            {schedule.route.to} - {format(end, "HH:mm")}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                            {/* END STOPPAGE */}

                            {/* START PAYMENT */}
                            <div className="border border-dashed border-blue-500 ">
                                <CardHeader>
                                    <h2 className="font-semibold">Payment</h2>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex justify-between items-center">
                                        <FormLabel>Total</FormLabel>
                                        <Badge variant="secondary">
                                            {ticketPrice(schedule)} $
                                        </Badge>
                                    </div>
                                    <div className="flex justify-center mt-8">
                                        <Button disabled={isDisabled} size="lg" color="blue-500">Confirmer</Button>
                                    </div>
                                </CardContent>
                            </div>
                            {/* END PAYMENT */}
                        </div>
                    </div>
                </form>
            </Form>
        </CardContent>
    </div>
  )
}
