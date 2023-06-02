import { NextApiResponse, NextApiRequest } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import prisma from "@/prisma/client";
import { Schedule, ScheduleSchema } from "@/lib/validators/schedule";


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const session = await getServerSession(req, res, authOptions)
    if(req.method === "POST") {
        if(!session) return res.status(401).json({
            success: false,
            code: 401,
            errors: [{ message: "Please sign in" }]
        })

        const schedule: Schedule = req.body
        
        const validate = ScheduleSchema.safeParse(schedule)

        if(!validate.success) {
            return res.status(403).json({
                success: false,
                code: 403,
                errors: validate.error.issues.map(issue => ({
                    message: issue.message
                }))
            })
        }

        const bus = await prisma.bus.findUnique({
            where: {
                id: schedule.busId
            },
            include: {
                plan: true
            }
        })

        if(!bus) {
            return res.status(403).json({
                success: false,
                code: 403,
                errors: [{ message: "Le bus n'existe pas" }]
            })
        }

        try {
            const result = await prisma.schedule.create({
                data: {...schedule, availableSeats: bus.numberOfSeats}
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
                errors: [{ message: "Error has occured while making adding schedule" }]
            })
        }
        
    }
}