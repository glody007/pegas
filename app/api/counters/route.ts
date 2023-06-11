import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { Counter, CounterSchema } from "@/lib/validators/counter";

export async function GET(
    req: NextRequest
) {
    const session = true //await getServerSession(req, res, authOptions)
    try {
        const data = await prisma.counter.findMany()
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
            errors: [{ message: "Error fetching routes" }]
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

    const counter: Counter = await req.json()
    
    const validate = CounterSchema.safeParse(counter)

    if(!validate.success) {
        return NextResponse.json({
            success: false,
            code: 403,
            errors: validate.error.issues.map(issue => ({
                message: issue.message
            }))
        }, { status: 403 })
    }

    const exist = await prisma.counter.findUnique({
        where: {
            name: counter.name
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
        const result = await prisma.counter.create({
            data: counter
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
            errors: [{ message: "Error has occured while making adding counter" }]
        }, { status: 500 })
    }
}