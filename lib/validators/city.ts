import {z} from "zod"

export const CitySchema = z.enum(["Lubumbashi", "Likasi", "Kolwezi", "Kambove", "Kasumbalesa"])