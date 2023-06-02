import {z} from "zod"
import { BusFullSchema, BusSchema } from "./bus"
import { RouteSchema } from "./route"
import { UserSchema } from "./user"

const DriverMinimumSchema = z.object({
    id: z.string().min(1, {
        message: "Id obligatoire"
    }),
    name: z.string().min(1, {
        message: "Nom obligatoire"
    }),
})

const BusMinimumSchema = z.object({
    id: z.string().min(1, {
        message: "Id obligatoire"
    }),
    name: z.string().min(1, {
        message: "Nom obligatoire"
    }),
})

const RouteMinimumSchema = z.object({
    id: z.string().min(1, {
        message: "Id obligatoire"
    }),
    from: z.string().min(1, {
        message: "From obligatoire"
    }),
    to: z.string().min(1, {
        message: "From obligatoire"
    }),
})

const ScheduleMinimumSchema = z.object({
    id: z.string().optional(),
    start: z.coerce.date(),
    end: z.coerce.date(),
    bus: BusMinimumSchema,
    route: RouteMinimumSchema
})

export const TicketSchema = z.object({
    id: z.string().optional(),
    createdAt: z.coerce.date().optional(),
    scheduleId: z.string().min(1, {
        message: "Schedule obligatoire"
    }),
    name: z.string().min(1, {
        message: "Nom obligatoire"
    }),
    email: z.string().email({
        message: "Email obligatoire"
    }),
    seat: z.string().min(1, {
        message: "Siege obligatoire"
    })
})

export const TicketFullSchema = z.object({
    id: z.string().optional(),
    createdAt: z.coerce.date(),
    scheduleId: z.string().min(1, {
        message: "Schedule obligatoire"
    }),
    schedule: ScheduleMinimumSchema,
    name: z.string().min(1, {
        message: "Nom obligatoire"
    }),
    email: z.string().email({
        message: "Email obligatoire"
    }),
    seat: z.string().min(1, {
        message: "Siege obligatoire"
    })
})

export const TicketArraySchema = z.array(TicketSchema)

export type Ticket = z.infer<typeof TicketSchema>
export type TicketFull = z.infer<typeof TicketFullSchema>