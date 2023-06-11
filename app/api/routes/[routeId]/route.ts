import { NextRequest, NextResponse } from "next/server"
import prisma from "@/prisma/client";
import { Route, RouteArraySchema, RouteSchema } from "@/lib/validators/route";

interface Query {
    routeId?: string
}

export async function GET(
    req: NextRequest,
    { params }: { params: Query }
) {
    try {
        const data = await prisma.route.findUnique({
            where: {
                id: params.routeId
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
            errors: [{ message: "Error fetching route" }]
        }, { status: 500 })
    }  
}