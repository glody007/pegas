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
import * as z from "zod"
import { RoleSchema, SexSchema, User, UserSchema } from "@/lib/validators/user"
import { useMutation, useQueryClient } from "react-query"
import axios, { AxiosError } from "axios"
import { useState } from "react"
import toast from "react-hot-toast"

interface UserFormProps {
    handleSuccess?: () => void
    user?: User
}

export default function UserForm({ handleSuccess, user }: UserFormProps) {
    const [isDisabled, setIsDisabled] = useState(false)
    let toastAddId: string

    const queryClient = useQueryClient()

    const defaultUser: User = {
        name: "",
        email: "",
        sex: SexSchema.enum.M,
        birthday: new Date(),
        role: RoleSchema.enum.passenger
    }

    const form = useForm<z.infer<typeof UserSchema>>({
        resolver: zodResolver(UserSchema),
        defaultValues: user ? {...user, birthday: new Date(user.birthday)} : defaultUser
    })

    const roles = Object.values(RoleSchema.Values).map(value => value)
    const sexes = Object.values(SexSchema.Values).map(value => value)

    const operation = user ? 'Modification' : 'Ajout'

    const request = (data: User) => {
        if(user) return axios.put(`/api/users/${user.id}`, data)
        return axios.post('/api/users', data)
    }

    const {mutate} = useMutation(
        async (user: User) => await request(user),
        {
            onError: (error) => {
                if(error instanceof AxiosError) {
                    toast.error(error?.response?.data.errors[0].message, {id: toastAddId})
                }
                setIsDisabled(false)
            },
            onSuccess: (data) => {
                toast.success(`${operation} reussi 👏`, { id: toastAddId })
                setIsDisabled(false)
                queryClient.invalidateQueries(["users"])
                if(handleSuccess) handleSuccess()
            }
        }
    )

    function onSubmit(values: User) {
        toastAddId = toast.loading(`${operation} en cours`, { id: toastAddId })
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
                                        <Input placeholder="Porgas D. Ace" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="newgate@pegas.com" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="role"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Role</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a role" />
                                        </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {roles.map(value => (
                                                <SelectItem key={value} value={value}>{value}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="sex"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Sex</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a city" />
                                        </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {sexes.map(value => (
                                                <SelectItem key={value} value={value}>{value}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="birthday"
                            render={({ field }) => (
                                <FormItem className="flex flex-col mt-2">
                                <FormLabel>Date</FormLabel>
                                <Popover>
                                    <PopoverTrigger asChild>
                                    <FormControl>
                                        <Button
                                        variant={"outline"}
                                        className={cn(
                                            " pl-3 text-left font-normal",
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
                    </div>
                    <Button disabled={isDisabled}  type="submit" className="mt-8">Confirmer</Button>
                </form>
            </Form>
    )
}