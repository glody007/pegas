import {z} from "zod"

export const UserSchema = z.object({
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
    role: z.string()
})

export const UserArraySchema = z.array(UserSchema)

export type User = z.infer<typeof UserSchema>