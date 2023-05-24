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
import { cn } from "@/lib/utils"
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
  

const formSchema = z.object({
  seat: z.string().min(1, {
    message: "Seat must be at least 1 characters.",
  }),
  mobile: z.string().min(1, {
    message: "Mobile must be at least 1 characters.",
  }),
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  gender: z.string().min(1, {
    message: "Gender must be at least 1 characters.",
  }),
  type: z.string().min(1, {
    message: "Type must be at least 1 characters.",
  }),
  boarding: z.string().min(1, {
    message: "Bording must be at least 1 characters.",
  }),
  dropping: z.string().min(1, {
    message: "Dropping must be at least 1 characters.",
  })
})

export function SellReserve() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
        seat: "",
        mobile: "",
        name: "",
        gender: "",
        type: "",
        boarding: "",
        dropping: ""
    },
  })

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }

  return (
    <div>
        <CardHeader>
            <div className="flex space-x-8">
                <div>
                    <p className="text-xs">Coach No</p>
                    <p className="text-xl text-blue-500">LP-2100</p>
                    <p className="text-xs">05-02-2023 08:00 PM</p>
                </div>
                <div>
                    <p className="text-xs mb-1">Select Route</p>
                    <Select>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select route" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="Lubumbashi-Kolwezi">Lubumbashi-Kolwezi</SelectItem>
                                <SelectItem value="Lubumbashi-Likasi">Lubumbashi-Likasi</SelectItem>
                                <SelectItem value="Likasi-kipushi">Likasi-kipushi</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
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
                                <h2 className="font-semibold">Passenger Details</h2>
                            </CardHeader>
                            <CardContent>
                                <div className="flex space-x-4">
                                    <div>
                                        <FormField
                                            control={form.control}
                                            name="seat"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Seat</FormLabel>
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
                                            name="mobile"
                                            render={({ field }) => (
                                                <FormItem>
                                                <FormLabel>Mobile</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="+2430070000" {...field} />
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
                                        <FormField
                                            control={form.control}
                                            name="gender"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Gender</FormLabel>
                                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                        <FormControl>
                                                            <SelectTrigger>
                                                                <SelectValue placeholder="Select gender" />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent>
                                                            <SelectItem value="M">M</SelectItem>
                                                            <SelectItem value="F">F</SelectItem>
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
                                            name="type"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Type</FormLabel>
                                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                        <FormControl>
                                                            <SelectTrigger>
                                                                <SelectValue placeholder="Select type" />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent>
                                                            <SelectItem value="adult">Adult</SelectItem>
                                                            <SelectItem value="child">Child</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <div>
                                        <FormLabel>Amount</FormLabel>
                                        <div className="flex justify-center mt-4">
                                            <Badge variant="secondary">
                                                20 $
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
                                    <h2 className="font-semibold">Stoppage</h2>
                                </CardHeader>
                                <CardContent>
                                    <FormField
                                        control={form.control}
                                        name="boarding"
                                        render={({ field }) => (
                                            <FormItem className="flex justify-between items-center space-x-8">
                                                <FormLabel>Boarding</FormLabel>
                                                <div className="flex-1">
                                                    <FormControl>
                                                        <Input placeholder="LUBUMBASHI TERMINAL - 09:00" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </div>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="dropping"
                                        render={({ field }) => (
                                            <FormItem className="flex justify-between items-center space-x-8">
                                                <FormLabel>Dropping</FormLabel>
                                                <div className="flex-1">
                                                    <FormControl>
                                                        <Input placeholder="KOLWEZI TERMINAL - 14:00" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </div>
                                            </FormItem>
                                        )}
                                    />
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
                                            20 $
                                        </Badge>
                                    </div>
                                    <div className="flex justify-center mt-8">
                                        <Button size="lg" color="blue-500">Confirmer</Button>
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
