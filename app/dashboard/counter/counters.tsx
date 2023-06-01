'use client'

import { DataTable } from "./data-table"
import { columns } from "./columns"
import React from 'react'
import { SkeletonTable } from '@/components/SkeletonTable'
import { useQuery } from 'react-query'
import { allCounters } from '@/service/counter'
import { Counter } from '@/lib/validators/counter'

type Props = {

}

export default function Counters({}: Props) {

  const { data: response, error, isLoading } = useQuery({
    queryFn: allCounters,
    queryKey: ["counters"]
  })

  if(error) return <>error...</>

  if(isLoading) return <SkeletonTable />

  const counters: Counter[] = response.data

  return (
    <>
        <DataTable columns={columns} data={counters} />
    </>
  )
}