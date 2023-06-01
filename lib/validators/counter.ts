import {z} from "zod"

export const CounterSchema = z.object({
    id: z.string().optional(),
    name: z.string().min(1, {
      message: "Name is required.",
    }),
    city: z.string().min(1, {
      message: "City is required.",
    }),
    country: z.string().min(2, {
      message: "Country is required.",
    })
})

export const CounterArraySchema = z.array(CounterSchema)

export type Counter = z.infer<typeof CounterSchema>