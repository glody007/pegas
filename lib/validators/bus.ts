import {z} from "zod"

export const PlanSchema = z.object({
    id: z.number().optional(),
    seatsConfig: z.string().min(2, {
        message: "Configuration des sieges obligatoire"
    }),
})

export const BusSchema = z.object({
    id: z.number().optional(),
    name: z.string().min(1, {
        message: "Nom obligatoire"
    }),
    brand: z.string().min(1, {
        message: "Marque obligatoire"
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

export const BusArraySchema = z.array(BusSchema)

export type Bus = z.infer<typeof BusSchema>