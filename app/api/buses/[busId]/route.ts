import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { Bus, BusSchema } from "@/lib/validators/bus";

interface Query {
    busId?: string
}

export async function GET(
    req: NextRequest,
    { params }: { params: Query }
) {
    try {
        const data = await prisma.bus.findUnique({
            where: {
                id: params.busId
            },
            include: {
                class: true
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
            errors: [{message: "Not found"}]
        }, { status: 404 })

    } catch(err) {
        console.log(err)
        return NextResponse.json({
            success: false,
            code: 500,
            errors: [{ message: "Error fetching bus" }]
        }, { status: 500 })
    }  
}