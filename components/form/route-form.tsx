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
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import * as z from "zod"
import { departure } from "@/types/departure"
import { Combobox, ComboboxHandle } from "../ui/combobox"
import RouteMaker from "../route-maker"
import { useRef, useState } from "react"
import { Route, RouteSchema } from "@/lib/validators/route"
import { useMutation, useQueryClient } from "react-query"
import axios, { AxiosError } from "axios"
import { CountrySchema } from "@/lib/validators/country"
import toast from "react-hot-toast"

interface RouteFormProps {
    handleSuccess?: () => void
}

function getData(): departure[] {
    // Fetch data from your API here.
    return [
      {
        id: "1",
        name: "Lubumbashi",
        city: "Lubumbashi",
        country: CountrySchema.enum["RDC (congo)"]
      },
      {
        id: "2",
        name: "Likasi",
        city: "Likasi",
        country: CountrySchema.enum["RDC (congo)"]
      },
      {
        id: "3",
        name: "Kolwezi",
        city: "Kolwezi",
        country: CountrySchema.enum["RDC (congo)"]
      },
      {
        id: "4",
        name: "Kasumbalesa",
        city: "Kasumbalesa",
        country: CountrySchema.enum["RDC (congo)"]
      },
      {
        id: "5",
        name: "Kambove",
        city: "Kambove",
        country:  CountrySchema.enum["RDC (congo)"]
      },
      {
        id: "6",
        name: "Kitwe",
        city: "Kitwe",
        country:  CountrySchema.enum.Zambie
      },
      {
        id: "7",
        name: "Cape town",
        city: "Cape town",
        country:  CountrySchema.enum["Afrique du sud"]
      },
    ]
} 

export default function RouteForm({ handleSuccess }: RouteFormProps) {
    const [isDisabled, setIsDisabled] = useState(false)
    let toastAddId: string

    const queryClient = useQueryClient()

    const form = useForm<z.infer<typeof RouteSchema>>({
        resolver: zodResolver(RouteSchema),
        defaultValues: {
            from: "",
            to: "",
            duration: 0,
            stops: []
        },
    })

    type ComboHandle = React.ElementRef<typeof Combobox>;

    const refFrom = useRef<ComboHandle>(null); 
    const refTo = useRef<ComboHandle>(null); 

    const {mutate} = useMutation(
        async (route: Route) => await axios.post('/api/routes/addRoute', route),
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
                queryClient.invalidateQueries(["routes"])
                if(handleSuccess) handleSuccess()
            }
        }
    )

    function onSubmit(values: Route) {
        toastAddId = toast.loading("Ajout en cours", { id: toastAddId })
        setIsDisabled(true)
        mutate(values)
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
            label: places[0].city,
            value: places[0].city
        })
        
        if(places.length === 1) {
            currentTo.selectItem(undefined)
            return
        }

        if(places.length > 1) {
            currentTo.selectItem({
                label: places.slice(-1)[0].city,
                value: places.slice(-1)[0].city
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
                                                disabled
                                                placeholder="Add place" 
                                                searchHint="Search place" 
                                                items={data.map((departure, index) => ({
                                                    value: departure.city || String(index),
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
                                                    disabled
                                                    placeholder="Add place" 
                                                    searchHint="Search place" 
                                                    items={data.map((departure, index) => ({
                                                        value: departure.city || String(index),
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
                                        <FormLabel>Duration(minutes)</FormLabel>
                                        <FormControl>
                                            <Input 
                                                placeholder="300" {...field} 
                                                onChange={(e) =>
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
                        <FormField
                            control={form.control}
                            name="stops"
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
                    <Button disabled={isDisabled} type="submit" className="mt-8">Save</Button>
                </form>
            </Form>
    )
}