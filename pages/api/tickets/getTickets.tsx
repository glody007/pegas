import { NextApiResponse, NextApiRequest } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import prisma from "@/prisma/client";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const session = true //await getServerSession(req, res, authOptions)
    if(req.method === "GET") {
        try {
            const data = await prisma.ticket.findMany({
                orderBy: {
                    schedule: {
                        start: 'asc'
                    }
                },
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
                                    name: true,
                                    class: true
                                }
                            }
                        }
                    }
                }
            })
            res.status(200).json({
                success: true,
                code: 200,
                data: data
            })
        } catch(err) {
            console.log(err)
            res.status(403).json({
                success: false,
                code: 403,
                errors: [{ message: "Error fetching tickets" }]
            })
        }  
    }
}