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
import * as z from "zod"
import { Bus, BusSchema } from "@/lib/validators/bus"
import { useMutation, useQueryClient } from "react-query"
import axios, { AxiosError } from "axios"
import toast from "react-hot-toast"
import { useState } from "react"

export default function BusForm() {
    const [isDisabled, setIsDisabled] = useState(false)
    let toastAddId: string

    const form = useForm<z.infer<typeof BusSchema>>({
        resolver: zodResolver(BusSchema),
        defaultValues: {
            name: "",
            brand: "",
            planId: "",
            photoUrl: "",
            numberOfSeats: 0
        },
    })

    const {mutate} = useMutation(
        async (bus: Bus) => await axios.post('/api/buses/addBus', bus),
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
            }
        }
    )

    function onSubmit(values: Bus) {
        toastAddId = toast.loading("Ajout en cours", { id: toastAddId })
        setIsDisabled(true)
        mutate(values)
    }

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
                                        <Input placeholder="PG-" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="brand"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Brand</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a brand" />
                                        </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="Yutton">Yutton</SelectItem>
                                            <SelectItem value="higer">Higer</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="planId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Plan</FormLabel>
                                    <Select 
                                        onValueChange={field.onChange} 
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a plan" />
                                        </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="clia09lj0000008moh9ua53c1">Plan XM</SelectItem>
                                            <SelectItem value="clia09lj0000008moh9ua53c1">Plan RG</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="photoUrl"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Image url</FormLabel>
                                    <FormControl>
                                        <Input placeholder="https://" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="numberOfSeats"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Number of seats</FormLabel>
                                    <FormControl>
                                        <Input placeholder="56" {...field} onChange={(e) =>
                                                field.onChange(
                                                    Number.isNaN(parseFloat(e.target.value))
                                                    ? 0
                                                    : parseFloat(e.target.value)
                                                )
                                            }
                                        />
                                    </FormControl>
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