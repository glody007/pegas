import {z} from "zod"

export const CountrySchema = z.enum(["RDC (congo)", "Zambie", "Tanzanie", "Afrique du sud"])