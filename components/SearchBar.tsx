"use client"

import React from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { format } from "date-fns"
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
import { Combobox, comboboxItem } from './ui/combobox'
import { Input } from "@/components/ui/input"
import { useForm } from 'react-hook-form'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { CalendarIcon } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { cn } from '@/lib/utils'
import { CitySchema } from '@/lib/validators/city'
import { useRouter } from 'next/navigation'

const formSchema = z.object({
  from: z.string().optional(),
  to: z.string().optional(),
  date: z.coerce.date().optional(),
})


interface Props {
    from?: string,
    to?: string,
    date?: Date
}




export default function SearchBar({ from, to, date }: Props) {
    const router = useRouter()

    const DEFAULT_FROM = ""
    const DEFAULT_TO = ""

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            from: from ?? DEFAULT_FROM,
            to: to ?? DEFAULT_TO,
            date: date ?? new Date()
        },
    })

  const cities = Object.values(CitySchema.Values).map(value => value)

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const date = format(values.date || new Date(), "yyyy-MM-dd")
    const link = `/search?from=${values.from}&to=${values.to}&date=${date}`
    router.push(link)
  }

  return (
    <div className="flex-1 p-8 bg-white rounded-xl">
        <Form {...form}>
            <form 
                onSubmit={form.handleSubmit(onSubmit)} 
                className="flex flex-col sm:flex-row items-center space-x-0 sm:space-x-2 space-y-2  sm:space-y-0"
            >
                <div>
                    <FormField
                        control={form.control}
                        name="from"
                        render={({ field }) => (
                            <FormItem>
                                <Combobox 
                                    placeholder="Où êtes-vous?" 
                                    searchHint="Ville" 
                                    items={cities.map((city, index) => ({
                                        value: city,
                                        label: city
                                    }))}
                                    defaultValue={{
                                        value: from || DEFAULT_FROM,
                                        label: from || DEFAULT_FROM
                                    }}
                                    handleSelect={field.onChange}
                                />
                            </FormItem>
                        )}
                    />
                </div>
                <div className="">
                    <FormField
                        control={form.control}
                        name="to"
                        render={({ field }) => (
                            <FormItem>
                                <Combobox 
                                    placeholder="Où allez-vous" 
                                    searchHint="Ville" 
                                    items={cities.map((city, index) => ({
                                        value: city,
                                        label: city
                                    }))}
                                    defaultValue={{
                                        value: to || DEFAULT_TO,
                                        label: to || DEFAULT_TO
                                    }}
                                    handleSelect={field.onChange}
                                />
                            </FormItem>
                        )}
                    />
                </div>
                <div className="w-[200px] sm:flex-[0.6]">
                    <FormField
                        control={form.control}
                        name="date"
                        render={({ field }) => (
                            <FormItem>
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
                                            <span>CHOISIR LA DATE</span>
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
                                            date < new Date()
                                        }
                                        initialFocus
                                    />
                                    </PopoverContent>
                                </Popover>
                            </FormItem>
                        )}
                    />
                </div>
                <Button type="submit" className="w-[200px] sm:flex-[0.6]">
                    Recherche
                </Button>
            </form>
        </Form>
    </div>
  )
}