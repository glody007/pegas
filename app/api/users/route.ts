import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { User, UserSchema } from "@/lib/validators/user";

export async function GET(
    req: NextRequest,
) {
    const session = true //await getServerSession(req, res, authOptions)
    try {
        const data = await prisma.user.findMany({
            orderBy: {
                name: 'asc'
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
            errors: [{ message: "Error fetching users" }]
        }, { status: 500 })
    }  
}

export async function POST(
    req: NextRequest
) {
    const session = true //await getServerSession(req, res, authOptions)
    if(req.method === "POST") {
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

        if(exist) {
            return NextResponse.json({
                success: false,
                code: 403,
                errors: [{ message: "Email déja utilisé" }]
            }, { status: 403 })
        }

        try {
            const result = await prisma.user.create({
                data: user
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
                errors: [{ message: "Error has occured while adding user" }]
            })
        }
        
    }
}