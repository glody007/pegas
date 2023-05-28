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
import { Combobox } from "../ui/combobox"
import RouteMaker from "../route-maker"

const formSchema = z.object({
    from: z.string().min(2, {
      message: "Name must be at least 2 characters.",
    }),
    to: z.string().min(2, {
      message: "City must be at least 2 characters.",
    }),
    duration: z.string().min(2, {
      message: "Country must be at least 2 characters.",
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

    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
    }

    const data = getData()

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
                                                placeholder="Select place" 
                                                searchHint="Search place" 
                                                items={data.map((departure, index) => ({
                                                    value: departure.id || String(index),
                                                    label: departure.city
                                                }))}
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
                                                    placeholder="Select place" 
                                                    searchHint="Search place" 
                                                    items={data.map((departure, index) => ({
                                                        value: departure.id || String(index),
                                                        label: departure.city
                                                    }))}
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
                        <RouteMaker places={data} initials={[]} />
                    </div>
                    <Button type="submit" className="mt-8">Save</Button>
                </form>
            </Form>
    )
}