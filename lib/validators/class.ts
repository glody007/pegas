import {z} from "zod"

export const ClassSchema = z.object({
    id: z.string().optional(),
    name: z.string().min(2, {
        message: "Nom obligatoire"
    }),
    priceFactor: z.number().min(1, {
        message: "Price factor obligatoire"
    }),
})

export type Class = z.infer<typeof ClassSchema>