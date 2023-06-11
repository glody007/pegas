import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { Route, RouteSchema } from "@/lib/validators/route";

export async function GET(
    req: NextRequest
) {
    const session = true //await getServerSession(req, res, authOptions)
    try {
        const data = await prisma.route.findMany({
            orderBy: {
                from: 'asc'
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

    try {
        const result = await prisma.route.create({
            data: route
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
            errors: [{ message: "Error has occured while adding route" }]
        }, { status: 500 })
    }
        
}