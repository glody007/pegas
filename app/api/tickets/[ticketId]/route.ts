import { ScheduleFull } from "@/lib/validators/schedule";
import { TicketSchema } from "@/lib/validators/ticket";
import prisma from "@/prisma/client";
import { Ticket } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { scheduleTravelTime, ticketPrice } from "@/lib/utils";
import { CourierClient } from "@trycourier/courier";
import { format } from "date-fns";

interface Query {
    ticketId?: string
}

export async function GET(
    req: NextRequest,
    { params }: { params: Query }
) {
    try {
        const data = await prisma.ticket.findUnique({
            where: {
                id: params.ticketId
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

        if(data) return NextResponse.json({
            success: true,
            code: 200,
            data: data
        }, { status: 200 })

        return NextResponse.json({
            success: true,
            code: 404,
            errors: [{message: "Ce ticket n'existe pas"}]
        }, { status: 404 })

    } catch(err) {
        console.log(err)
        return NextResponse.json({
            success: false,
            code: 500,
            errors: [{ message: "Error fetching ticket" }]
        }, { status: 500 })
    }  
}

export async function PUT(
    req: NextRequest,
    { params }: { params: Query }
) {
    try {
        const session = true //await getServerSession(req, res, authOptions)
        if(!session) return NextResponse.json({
            success: false,
            code: 401,
            errors: [{ message: "Please sign in" }]
        }, { status: 401 })

        const data = await prisma.ticket.findUnique({
            where: {
                id: params.ticketId
            }
        })

        if(!data) return NextResponse.json({
            success: true,
            code: 404,
            errors: [{message: "Not found"}]
        }, { status: 404 })

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

        const dataSchedule = await prisma.schedule.findUnique({
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

        if(!dataSchedule) {
            return NextResponse.json({
                success: false,
                code: 403,
                errors: [{ message: "Le schedule n'existe pas" }]
            }, { status: 403 })
        }

        const schedule: ScheduleFull = dataSchedule as ScheduleFull

        const result = await prisma.ticket.update({
            where: { id: params.ticketId },
            data: ticket
        })

        const price = ticketPrice(schedule)

        if(result.email) {
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
            code: 200,
            data: result
        }, { status: 200 })
    } catch(err) {
        console.log(err)
        return NextResponse.json({
            success: false,
            code: 500,
            errors: [{ message: "Error has occured while updating ticket" }]
        }, { status: 500 })
    }
}