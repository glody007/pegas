import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { Counter, CounterSchema } from "@/lib/validators/counter";

interface Query {
    counterId?: string
}

export async function GET(
    req: NextRequest,
    { params }: { params: Query }
) {
    try {
        const data = await prisma.counter.findUnique({
            where: {
                id: params.counterId
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
            errors: [{ message: "Error fetching counter" }]
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

        const data = await prisma.counter.findUnique({
            where: {
                id: params.counterId
            }
        })

        if(!data) return NextResponse.json({
            success: true,
            code: 404,
            errors: [{message: "Not found"}]
        }, { status: 404 })

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

        const result = await prisma.counter.update({
            where: { id: params.counterId },
            data: counter
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
            errors: [{ message: "Error has occured while updating counter" }]
        }, { status: 500 })
    }
}