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
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { CalendarIcon } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import * as z from "zod"
import { Schedule, ScheduleSchema } from "@/lib/validators/schedule"
import { Bus } from "@/lib/validators/bus"
import { Route } from "@/lib/validators/route"
import { User } from "@/lib/validators/user"
import { useMutation } from "react-query"
import axios from "axios"

interface ScheduleFormProps {
    buses: Bus[],
    routes: Route[],
    drivers: User[]
}

export default function ScheduleForm({ buses, routes, drivers }: ScheduleFormProps) {
    const form = useForm<z.infer<typeof ScheduleSchema>>({
        resolver: zodResolver(ScheduleSchema),
        defaultValues: {
            start: new Date(),
            end: new Date(),
            busId: "0",
            driverId: "0",
            routeId: "0"
        },
    })

    const {mutate} = useMutation(
        async (schedule: Schedule) => await axios.post('/api/schedules/addSchedule', schedule)
    )

    function onSubmit(values: Schedule) {
        mutate(values)
    }

    return (
        <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="space-y-4">
                        <FormField
                            control={form.control}
                            name="start"
                            render={({ field }) => (
                                <FormItem className="flex flex-col mt-2">
                                <FormLabel>Start</FormLabel>
                                <Popover>
                                    <PopoverTrigger asChild>
                                    <FormControl>
                                        <Button
                                        variant={"outline"}
                                        className={cn(
                                            "w-full pl-3 text-left font-normal",
                                            !field.value && "text-muted-foreground"
                                        )}
                                        >
                                        {field.value ? (
                                            format(field.value, "PPP")
                                        ) : (
                                            <span>Pick a date</span>
                                        )}
                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                        </Button>
                                    </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                        mode="single"
                                        selected={field.value}
                                        onSelect={field.onChange}
                                        disabled={(date) =>
                                            date > new Date() || date < new Date("1900-01-01")
                                        }
                                        initialFocus
                                    />
                                    </PopoverContent>
                                </Popover>
                                <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="end"
                            render={({ field }) => (
                                <FormItem className="flex flex-col mt-2">
                                <FormLabel>End</FormLabel>
                                <Popover>
                                    <PopoverTrigger asChild>
                                    <FormControl>
                                        <Button
                                        variant={"outline"}
                                        className={cn(
                                            "w-full pl-3 text-left font-normal",
                                            !field.value && "text-muted-foreground"
                                        )}
                                        >
                                        {field.value ? (
                                            format(field.value, "PPP")
                                        ) : (
                                            <span>Pick a date</span>
                                        )}
                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                        </Button>
                                    </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                        mode="single"
                                        selected={field.value}
                                        onSelect={field.onChange}
                                        disabled={(date) =>
                                            date > new Date() || date < new Date("1900-01-01")
                                        }
                                        initialFocus
                                    />
                                    </PopoverContent>
                                </Popover>
                                <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="busId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Bus</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={String(field.value)}>
                                        <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a bus" />
                                        </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {buses.map((bus, index) => (
                                                <SelectItem key={index} value={bus.id || String(index)}>{bus.name}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="routeId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Route</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={String(field.value)}>
                                        <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a bus" />
                                        </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {routes.map((route, index) => (
                                                <SelectItem key={index} value={route.id || String(index)}>{route.from}-{route.to}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="driverId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Driver</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={String(field.value)}>
                                        <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a driver" />
                                        </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {drivers.map((driver, index) => (
                                                <SelectItem key={index} value={driver.id || String(index)}>{driver.name}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <Button type="submit" className="mt-8">Save</Button>
                </form>
            </Form>
    )
}