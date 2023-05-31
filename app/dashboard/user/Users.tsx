'use client'

import { User } from '@/lib/validators/user'
import { DataTable } from "./data-table"
import { columns } from "./columns"
import React from 'react'
import axios from 'axios'
import { SkeletonTable } from '@/components/SkeletonTable'
import { useQuery } from 'react-query'

type Props = {
    data: User[]
}

const allUsers = async () => {
    const response = await axios.get("/api/users/getUsers")
    return response.data
}

export default function Users({data}: Props) {

  const { data: response, error, isLoading } = useQuery({
    queryFn: allUsers,
    queryKey: ["users"]
  })

  if(error) return <>error...</>

  if(isLoading) return <SkeletonTable />

  return (
    <>
        <DataTable columns={columns} data={data} />
    </>
  )
}