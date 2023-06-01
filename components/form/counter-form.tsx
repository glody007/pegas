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
import { Counter, CounterSchema } from "@/lib/validators/counter"
import { CitySchema } from "@/lib/validators/city"
import { CountrySchema } from "@/lib/validators/country"
import axios, { AxiosError } from "axios"
import { useMutation, useQueryClient } from "react-query"
import { useState } from "react"
import toast from "react-hot-toast"

interface UserFormProps {
    handleSuccess?: () => void
}

export default function CounterForm({ handleSuccess }: UserFormProps) {
    const [isDisabled, setIsDisabled] = useState(false)
    let toastAddId: string

    const queryClient = useQueryClient()

    const form = useForm<Counter>({
        resolver: zodResolver(CounterSchema),
        defaultValues: {
            name: "",
            city: "",
            country: ""
        },
    })

    const {mutate} = useMutation(
        async (counter: Counter) => await axios.post('/api/counters/addCounter', counter),
        {
            onError: (error) => {
                if(error instanceof AxiosError) {
                    toast.error(error?.response?.data.errors[0].message, {id: toastAddId})
                }
                setIsDisabled(false)
            },
            onSuccess: (data) => {
                toast.success("Ajout reussi 👏", { id: toastAddId })
                setIsDisabled(false)
                queryClient.invalidateQueries(["counters"])
                if(handleSuccess) handleSuccess()
            }
        }
    )

    function onSubmit(values: Counter) {
        toastAddId = toast.loading("Ajout en cours", { id: toastAddId })
        setIsDisabled(true)
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
                    <Button disabled={isDisabled} type="submit" className="mt-8">Save</Button>
                </form>
            </Form>
    )
}