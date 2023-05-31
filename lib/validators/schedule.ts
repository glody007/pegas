import {z} from "zod"

export const ScheduleSchema = z.object({
    id: z.string().optional(),
    start: z.coerce.date(),
    end: z.coerce.date(),
    driverId: z.string().min(1, { message: "Driver obligatoire"}),
    busId: z.string().min(1, { message: "Driver obligatoire"}),
    routeId: z.string().min(1, { message: "Driver obligatoire"}) 
})

export const ScheduleArraySchema = z.array(ScheduleSchema)

export type Schedule = z.infer<typeof ScheduleSchema>