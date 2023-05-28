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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import * as z from "zod"
import { departure } from "@/types/departure"
import { Combobox, ComboboxHandle } from "../ui/combobox"
import RouteMaker from "../route-maker"
import { useRef } from "react"

const formSchema = z.object({
    from: z.string().min(1, {
      message: "From is required.",
    }),
    to: z.string().min(1, {
      message: "To is required.",
    }),
    duration: z.string().min(2, {
      message: "Duration is required.",
    }),
    places: z.array(z.string()).min(2, {
        message: "Minimum 2 places.",
    }),
})

function getData(): departure[] {
    // Fetch data from your API here.
    return [
      {
        id: "1",
        name: "Lubumbashi T-1",
        city: "Lubumbashi",
        country: "DRC"
      },
      {
        id: "2",
        name: "Likasi T-4",
        city: "Likasi",
        country: "DRC"
      },
      {
        id: "3",
        name: "Kolwezi T-1",
        city: "Kolwezi",
        country: "DRC"
      },
    ]
} 

export default function RouteForm() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            from: "",
            to: "",
            duration: "",
            places: []
        },
    })

    type ComboHandle = React.ElementRef<typeof Combobox>;

    const refFrom = useRef<ComboHandle>(null); 
    const refTo = useRef<ComboHandle>(null); 


    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
    }

    const data = getData()

    const handleRouteMakerChange = (places: Array<departure>) => {
        const currentFrom = refFrom.current as ComboboxHandle
        const currentTo = refTo.current as ComboboxHandle

        if(places.length === 0) {
            currentFrom.selectItem(undefined)
            currentTo.selectItem(undefined)
            return 
        }

        currentFrom.selectItem({
            label: places[0].country,
            value: places[0].id || "0"
        })
        
        if(places.length === 1) {
            currentTo.selectItem(undefined)
            return
        }

        if(places.length > 1) {
            currentTo.selectItem({
                label: places.slice(-1)[0].country,
                value: places.slice(-1)[0].id || "0"
            })
            return
        }


    } 

    return (
        <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="flex space-x-4">
                        <div className="space-y-4">
                            <FormField
                                control={form.control}
                                name="from"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>From</FormLabel>
                                        <div>
                                            <Combobox 
                                                ref={refFrom}
                                                placeholder="Select place" 
                                                searchHint="Search place" 
                                                items={data.map((departure, index) => ({
                                                    value: departure.id || String(index),
                                                    label: departure.city
                                                }))}
                                                handleSelect={(item) => field.onChange(item?.value)}
                                            />
                                        </div>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="to"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>To</FormLabel>
                                            <div>
                                                <Combobox 
                                                    ref={refTo}
                                                    placeholder="Select place" 
                                                    searchHint="Search place" 
                                                    items={data.map((departure, index) => ({
                                                        value: departure.id || String(index),
                                                        label: departure.city
                                                    }))}
                                                    handleSelect={(item) => {field.onChange(item?.value)}}
                                                />
                                            </div>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="duration"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Duration</FormLabel>
                                        <FormControl>
                                            <Input placeholder="5 hours" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <FormField
                            control={form.control}
                            name="places"
                            render={({ field }) => (
                                <FormItem>
                                    <RouteMaker 
                                        places={data} 
                                        initials={[]} 
                                        onChange={(places) => {
                                            field.onChange(places.map(place => place.name))
                                            handleRouteMakerChange(places)
                                        }}
                                    />
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