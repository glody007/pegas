'use client'

import React, { useState } from "react"
import { TicketDetails } from "@/components/TicketDetails"
import axios, { AxiosError } from "axios"
import { useQuery } from "react-query"
import { SkeletonTable } from "@/components/SkeletonTable"
import { TicketFull } from "@/lib/validators/ticket"
import { useParams } from "next/navigation"

export default function Details() {
    const params = useParams()

    const { data: response , error, isLoading } = useQuery({
        queryFn: async () => {
            const response = await axios.get(`/api/tickets/${params?.ticketId}`)
            return response.data
        },
        queryKey: ["tickets"]
    })

    if(error) {
        if(error instanceof AxiosError) {
            return (
                <div className="flex justify-center p-4 rounded bg-red-100 text-gray-500 text-xs">
                    {error?.response?.data.errors[0].message}
                </div>
            )
        } 
        return (
            <div className="flex justify-center p-4 rounded bg-red-100 text-gray-500 text-xs">
                {"Une erreur s&aposest produite verifiez votre connection"}
            </div>
        )
    }

    if(isLoading) return <SkeletonTable />

    const ticket: TicketFull = response.data

    return (
        <div className="mx-auto mt-4">
            <TicketDetails ticket={ticket} />
        </div>
    )
}