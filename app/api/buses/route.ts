import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import prisma from "@/prisma/client";
import { Bus, BusSchema } from "@/lib/validators/bus";

export async function GET(
    req: NextRequest
) {
    const session = true //await getServerSession(req, res, authOptions)
    try {
        const data = await prisma.bus.findMany({
            orderBy: {
                name: 'asc'
            },
            include: {
                class: true
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
            errors: [{ message: "Error fetching buses" }]
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

    const bus: Bus = await req.json()
    
    const validate = BusSchema.safeParse(bus)

    if(!validate.success) {
        return NextResponse.json({
            success: false,
            code: 403,
            errors: validate.error.issues.map(issue => ({
                message: issue.message
            }))
        }, { status: 403 })
    }

    const exist = await prisma.bus.findUnique({
        where: {
            name: bus.name
        }
    })

    if(exist) {
        return NextResponse.json({
            success: false,
            code: 403,
            errors: [{ message: "Nom déja utilisé" }]
        }, { status: 403 })
    }

    try {
        const result = await prisma.bus.create({
            data: bus
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
            errors: [{ message: "Error has occured while making a post" }]
        }, { status: 500 })
    }
}