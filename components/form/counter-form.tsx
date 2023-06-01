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
import { Counter, CounterSchema } from "@/lib/validators/counter"
import { CitySchema } from "@/lib/validators/city"
import { CountrySchema } from "@/lib/validators/country"
import axios from "axios"
import { useMutation } from "react-query"

export default function CounterForm() {
    const form = useForm<Counter>({
        resolver: zodResolver(CounterSchema),
        defaultValues: {
            name: "",
            city: "",
            country: ""
        },
    })

    const {mutate} = useMutation(
        async (counter: Counter) => await axios.post('/api/counters/addCounter', counter)
    )

    function onSubmit(values: Counter) {
        mutate(values)
    }

    const cities = Object.values(CitySchema.Values).map(value => value)
    const countries = Object.values(CountrySchema.Values).map(value => value)

    return (
        <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="space-y-4">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="counter L-1" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="city"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>City</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a city" />
                                        </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {cities.map(value => (
                                                <SelectItem value={value}>{value}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="country"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Country</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a country" />
                                        </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {countries.map(value => (
                                                <SelectItem value={value}>{value}</SelectItem>
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