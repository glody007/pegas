import { NextApiResponse, NextApiRequest } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import prisma from "@/prisma/client";
import { Ticket, TicketSchema } from "@/lib/validators/ticket";
import { ScheduleFull } from "@/lib/validators/schedule";
import { ticketPrice } from "@/lib/utils";

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

        const ticket: Ticket = req.body
        
        const validate = TicketSchema.safeParse(ticket)

        if(!validate.success) {
            return res.status(403).json({
                success: false,
                code: 403,
                errors: validate.error.issues.map(issue => ({
                    message: issue.message
                }))
            })
        }

        const data = await prisma.schedule.findUnique({
            where: {
                id: ticket.scheduleId
            },
            include: {
                route: true,
                driver: true,
                bus: {
                    include: {
                        class: true
                    }
                }
            }
        })

        if(!data) {
            return res.status(403).json({
                success: false,
                code: 403,
                errors: [{ message: "Le schedule n'existe pas" }]
            })
        }

        const schedule: ScheduleFull = data as ScheduleFull

        if(schedule.availableSeats <= 0) {
            return res.status(403).json({
                success: false,
                code: 403,
                errors: [{ message: "Le bus est deja rempli" }]
            })
        }

        try {
            const price = ticketPrice(schedule)
            const result = await prisma.ticket.create({
                data: {...ticket, price},
                include: {
                    schedule: {
                        include: {
                            route: {
                                select: {
                                    id: true,
                                    from: true,
                                    to: true
                                }
                            },
                            bus: {
                                select: {
                                    id: true,
                                    name: true
                                }
                            }
                        }
                    }
                }
            })

            await prisma.schedule.update({
                where: {
                    id: ticket.scheduleId
                },
                data: {
                    availableSeats: {
                        decrement: 1
                    }
                }
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
                errors: [{ message: "Error has occured while making buying ticket" }]
            })
        }
        
    }
}