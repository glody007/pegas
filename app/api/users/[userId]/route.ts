import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { User, UserSchema } from "@/lib/validators/user";

interface Query {
    userId?: string
}

export async function GET(
    req: NextRequest,
    { params }: { params: Query }
) {
    try {
        const data = await prisma.user.findUnique({
            where: {
                id: params.userId
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
            errors: [{ message: "Error fetching user" }]
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
    
        const user: User = await req.json()
        
        const validate = UserSchema.safeParse(user)
    
        if(!validate.success) {
            return NextResponse.json({
                success: false,
                code: 403,
                errors: validate.error.issues.map(issue => ({
                    message: issue.message
                }))
            }, { status: 403 })
        }
    
        const exist = await prisma.user.findUnique({
            where: {
                email: user.email
            }
        })
    
        if(exist && exist.id !== params.userId) {
            return NextResponse.json({
                success: false,
                code: 403,
                errors: [{ message: "Email déja utilisé" }]
            }, { status: 403 })
        }

        const result = await prisma.user.update({
            where: { id: params.userId },
            data: user
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
            errors: [{ message: "Error has occured while adding user" }]
        })
    }
}