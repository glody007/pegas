import { ScheduleFull } from "@/lib/validators/schedule";
import { Ticket, TicketSchema } from "@/lib/validators/ticket";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { scheduleTravelTime, ticketPrice } from "@/lib/utils";
import { CourierClient } from "@trycourier/courier";
import { format } from "date-fns";

export async function GET(
    req: NextRequest
) {
    const session = true //await getServerSession(req, res, authOptions)
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
        return NextResponse.json({
            success: true,
            code: 200,
            data: data
        }, { status: 200 })
    } catch(err) {
        console.log(err)
        return NextResponse.json({
            success: false,
            code: 500,
            errors: [{ message: "Error fetching tickets" }]
        }, { status: 500 })
    }  
}


export async function POST(
    req: NextRequest
) {
    const session = true //await getServerSession(req, res, authOptions)
    if(req.method === "POST") {
        if(!session) return NextResponse.json({
            success: false,
            code: 401,
            errors: [{ message: "Please sign in" }]
        }, { status: 401 })

        const ticket: Ticket = await req.json()
        
        const validate = TicketSchema.safeParse(ticket)

        if(!validate.success) {
            return NextResponse.json({
                success: false,
                code: 403,
                errors: validate.error.issues.map(issue => ({
                    message: issue.message
                }))
            }, { status: 403 })
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
            return NextResponse.json({
                success: false,
                code: 403,
                errors: [{ message: "Le schedule n'existe pas" }]
            }, { status: 403 })
        }

        const schedule: ScheduleFull = data as ScheduleFull

        if(schedule.availableSeats <= 0) {
            return NextResponse.json({
                success: false,
                code: 403,
                errors: [{ message: "Le bus est deja rempli" }]
            }, { status: 403 })
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
                                    name: true,
                                    class: true
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

            if(ticket.email) {
                const courier = CourierClient({ authorizationToken: process.env.COURIER_API_KEY });
                const { requestId } = await courier.send({
                    message: {
                      to: {
                        "email": ticket.email
                      },
                      template: "PT724M87A2M60AQND5WNQ0AZPVPB",
                      data: {
                        nom: ticket.name,
                        duration: scheduleTravelTime(schedule),
                        date: format(schedule.start, "dd/MM/yyyy"),
                        heure: format(schedule.start, "HH:mm"),
                        trajet: `${schedule.route.from}-${schedule.route.to}`,
                        prix: price,
                        lienQR: `${process.env.VERIFICATION_URL}${result.id}`
                      },
                    },
                });
            }

            return NextResponse.json({
                success: true,
                code: 201,
                data: result
            }, { status: 201 })
        } catch(err) {
            console.log(err)
            return NextResponse.json({
                success: false,
                code: 500,
                errors: [{ message: "Error has occured while buying ticket" }]
            }, { status: 500 })
        }
        
    }
}