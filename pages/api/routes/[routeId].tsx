import { NextApiResponse, NextApiRequest } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import prisma from "@/prisma/client";

interface Query {
    routeId?: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const session = await getServerSession(req, res, authOptions)
    if(req.method === "GET") {
        try {
            const query = req.query as Query
            const data = await prisma.route.findUnique({
                where: {
                    id: query.routeId
                }
            })

            if(data) return res.status(200).json({
                success: true,
                code: 200,
                data: data
            })

            res.status(404).json({
                success: true,
                code: 404,
                errors: [{message: "Not found"}]
            })

        } catch(err) {
            console.log(err)
            res.status(403).json({
                success: false,
                code: 403,
                errors: [{ message: "Error fetching route" }]
            })
        }  
    }
}