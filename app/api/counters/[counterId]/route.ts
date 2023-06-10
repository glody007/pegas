import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { Counter, CounterSchema } from "@/lib/validators/counter";

interface Query {
    counterId?: string
}

export async function GET(
    req: NextResponse,
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
