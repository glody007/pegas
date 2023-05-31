import {z} from "zod"

export const RouteSchema = z.object({
    id: z.string().optional(),
    from: z.string().min(1, {
      message: "From is required.",
    }),
    to: z.string().min(1, {
      message: "To is required.",
    }),
    duration: z.number().min(2, {
      message: "Duration is required.",
    }),
    stops: z.array(z.string()).min(2, {
        message: "Minimum 2 places.",
    }),
})

export const RouteArraySchema = z.array(RouteSchema)

export type Route = z.infer<typeof RouteSchema>