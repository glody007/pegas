import {z} from "zod"

export const RoleSchema = z.enum(["admin", "seller", "passenger", "driver", "controller"])
export const SexSchema = z.enum(["M", "F"])

export const UserSchema = z.object({
    id: z.string().optional(),
    name: z.string().min(2, {
      message: "Name must be at least 2 characters.",
    }),
    email: z.string().email({
      message: "This is not a valid email.",
    }),
    sex: z.string().min(1, {
      message: "Sex must be at least 1 character.",
    }),
    birthday: z.coerce.date(),
    photo: z.string().url().optional(),
    role: RoleSchema
})

export const UserArraySchema = z.array(UserSchema)

export type Role = z.infer<typeof RoleSchema>

export type Sex = z.infer<typeof SexSchema>

export type User = z.infer<typeof UserSchema>