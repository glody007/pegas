import {z} from "zod"

export const ScheduleSchema = z.object({
    id: z.number().optional(),
    start: z.coerce.date(),
    end: z.coerce.date(),
    driverId: z.number().min(1, { message: "Driver obligatoire"}),
    busId: z.number().min(1, { message: "Driver obligatoire"}),
    routeId: z.number().min(1, { message: "Driver obligatoire"}) 
})

export const ScheduleArraySchema = z.array(ScheduleSchema)

export type Schedule = z.infer<typeof ScheduleSchema>