'use client'

import { User } from '@/lib/validators/user'
import { DataTable } from "./data-table"
import { columns } from "./columns"
import React from 'react'
import axios from 'axios'
import { SkeletonTable } from '@/components/SkeletonTable'
import { useQuery } from 'react-query'
import { allUsers } from '@/service/user'

type Props = {
    data: User[]
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