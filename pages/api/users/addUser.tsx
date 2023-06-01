import { NextApiResponse, NextApiRequest } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import prisma from "@/prisma/client";
import { User, UserSchema } from "@/lib/validators/user";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const session = true //await getServerSession(req, res, authOptions)
    if(req.method === "POST") {
        if(!session) return res.status(401).json({
            success: false,
            code: 401,
            errors: [{ message: "Please sign in" }]
        })

        const user: User = req.body
        
        const validate = UserSchema.safeParse(user)

        if(!validate.success) {
            return res.status(403).json({
                success: false,
                code: 403,
                errors: validate.error.issues.map(issue => ({
                    message: issue.message
                }))
            })
        }

        const exist = await prisma.user.findUnique({
            where: {
                email: user.email
            }
        })

        if(exist) {
            return res.status(403).json({
                success: false,
                code: 403,
                errors: [{ message: "Email déja utilisé" }]
            })
        }

        try {
            const result = await prisma.user.create({
                data: user
            })

            res.status(201).json({
                success: true,
                code: 201,
                data: result
            })
        } catch(err) {
            console.log(err)
            res.status(403).json({
                success: false,
                code: 403,
                errors: [{ message: "Error has occured while making adding user" }]
            })
        }
        
    }
}