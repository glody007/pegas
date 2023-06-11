import { Schedule, ScheduleSchema } from "@/lib/validators/schedule"
import { NextRequest, NextResponse } from "next/server"
import prisma from "@/prisma/client";

interface Query {
    scheduleId?: string
}

export async function GET(
    req: NextRequest,
    { params }: { params: Query }
) {
    try {
        const data = await prisma.schedule.findUnique({
            where: {
                id: params.scheduleId
            }
        })

        if(data) return NextResponse.json({
            success: true,
            code: 200,
            data: data
        }, )

        return NextResponse.json({
            success: true,
            code: 404,
            errors: [{message: "Not found"}]
        }, { status: 404 })

    } catch(err) {
        console.log(err)
        return NextResponse.json({
            success: false,
            code: 500,
            errors: [{ message: "Error fetching schedule" }]
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

        const data = await prisma.schedule.findUnique({
            where: {
                id: params.scheduleId
            }
        })

        if(!data) return NextResponse.json({
            success: true,
            code: 404,
            errors: [{message: "Not found"}]
        }, { status: 404 })

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

        const result = await prisma.schedule.update({
            where: { id: params.scheduleId },
            data: {...schedule, availableSeats: bus.numberOfSeats}
        })

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
            errors: [{ message: "Error has occured while updating schedule" }]
        }, { status: 500 })
    }
}