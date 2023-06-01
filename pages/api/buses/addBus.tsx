import { Bus, BusSchema } from "@/lib/validators/bus";
import { NextApiResponse, NextApiRequest } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import prisma from "@/prisma/client";

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

        const bus: Bus = req.body
        
        const validate = BusSchema.safeParse(bus)

        if(!validate.success) {
            return res.status(403).json({
                success: false,
                code: 403,
                errors: validate.error.issues.map(issue => ({
                    message: issue.message
                }))
            })
        }

        const exist = await prisma.bus.findUnique({
            where: {
                name: bus.name
            }
        })

        if(exist) {
            return res.status(403).json({
                success: false,
                code: 403,
                errors: [{ message: "Nom déja utilisé" }]
            })
        }

        try {
            const result = await prisma.bus.create({
                data: bus
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
                errors: [{ message: "Error has occured while making a post" }]
            })
        }
        
    }
}