import {z} from "zod"
import { BusFullSchema, BusSchema } from "./bus"
import { RouteSchema } from "./route"
import { UserSchema } from "./user"

export const ScheduleSchema = z.object({
    id: z.string().optional(),
    start: z.coerce.date(),
    end: z.coerce.date(),
    driverId: z.string().min(1, { message: "Driver obligatoire"}),
    busId: z.string().min(1, { message: "Driver obligatoire"}),
    routeId: z.string().min(1, { message: "Driver obligatoire"}) 
})

export const ScheduleFullSchema = z.object({
    id: z.string().optional(),
    start: z.coerce.date(),
    end: z.coerce.date(),
    driverId: z.string().min(1, { message: "Driver obligatoire"}),
    driver: UserSchema,
    busId: z.string().min(1, { message: "Driver obligatoire"}),
    bus: BusFullSchema,
    routeId: z.string().min(1, { message: "Driver obligatoire"}),
    route: RouteSchema
})

export const ScheduleArraySchema = z.array(ScheduleSchema)

export type Schedule = z.infer<typeof ScheduleSchema>

export type ScheduleFull = z.infer<typeof ScheduleFullSchema>