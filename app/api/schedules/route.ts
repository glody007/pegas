import { Schedule, ScheduleSchema } from "@/lib/validators/schedule";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
    req: NextRequest
) {
    const session = true //await getServerSession(req, res, authOptions)
    try {
        const data = await prisma.schedule.findMany({
            orderBy: {
                start: 'asc'
            },
            include: {
                driver: true,
                route: true,
                bus: {
                    include: {
                        class: true
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
            errors: [{ message: "Error fetching schedules" }]
        }, { status: 500 })
    }  
}

export async function POST(
    req: NextRequest
) {
    const session = true //await getServerSession(req, res, authOptions)
    if(!session) return NextResponse.json({
        success: false,
        code: 401,
        errors: [{ message: "Please sign in" }]
    }, { status: 401 })

    const schedule: Schedule = await req.json()
    
    const validate = ScheduleSchema.safeParse(schedule)

    if(!validate.success) {
        return NextResponse.json({
            success: false,
            code: 403,
            errors: validate.error.issues.map(issue => ({
                message: issue.message
            }))
        }, { status: 403 })
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
        return NextResponse.json({
            success: false,
            code: 403,
            errors: [{ message: "Le bus n'existe pas" }]
        }, { status: 403 })
    }

    try {
        const result = await prisma.schedule.create({
            data: {...schedule, availableSeats: bus.numberOfSeats}
        })

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
            errors: [{ message: "Error has occured while adding schedule" }]
        }, { status: 500 })
    }
}