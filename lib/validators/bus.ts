import {z} from "zod"
import { ClassSchema } from "./class"

export const PlanSchema = z.object({
    id: z.number().optional(),
    seatsConfig: z.string().min(2, {
        message: "Configuration des sieges obligatoire"
    }),
})

export const BusSchema = z.object({
    id: z.string().optional(),
    name: z.string().min(1, {
        message: "Nom obligatoire"
    }),
    brand: z.string().min(1, {
        message: "Marque obligatoire"
    }),
    classId: z.string().min(1, {
        message: "Class obligatoire"
    }),
    planId: z.string({
        required_error: "Plan obligatoire"
    }),
    numberOfSeats: z.number().min(1, {
        message: "Nombre de places obligatoire"
    }),
    photoUrl: z.string().url({
        message: "Url invalide"
    })
})

export const BusFullSchema = z.object({
    id: z.string().optional(),
    name: z.string().min(1, {
        message: "Nom obligatoire"
    }),
    brand: z.string().min(1, {
        message: "Marque obligatoire"
    }),
    classId: z.string().min(1, {
        message: "Class obligatoire"
    }),
    class: ClassSchema,
    planId: z.string({
        required_error: "Plan obligatoire"
    }),
    numberOfSeats: z.number().min(1, {
        message: "Nombre de places obligatoire"
    }),
    photoUrl: z.string().url({
        message: "Url invalide"
    })
})

export const BusArraySchema = z.array(BusSchema)

export type Bus = z.infer<typeof BusSchema>

export type BusFull = z.infer<typeof BusFullSchema>