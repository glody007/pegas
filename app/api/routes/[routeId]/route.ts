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

        const data = await prisma.route.findUnique({
            where: {
                id: params.routeId
            }
        })

        if(!data) return NextResponse.json({
            success: true,
            code: 404,
            errors: [{message: "Not found"}]
        }, { status: 404 })

        const route: Route = await req.json()
        
        const validate = RouteSchema.safeParse(route)

        if(!validate.success) {
            return NextResponse.json({
                success: false,
                code: 403,
                errors: validate.error.issues.map(issue => ({
                    message: issue.message
                }))
            }, { status: 403 })
        }

        const exist = await prisma.route.findFirst({
            where: {
                from: route.from,
                to: route.to
            }
        })

        if(exist) {
            return NextResponse.json({
                success: false,
                code: 403,
                errors: [{ message: "Route existante" }]
            }, { status: 403 })
        }

        const result = await prisma.route.update({
            where: { id: params.routeId },
            data: route
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
            errors: [{ message: "Error has occured while updating route" }]
        }, { status: 500 })
    }
}