'use client'

import { QueryClient, QueryClientProvider } from "react-query";
import React, { ReactNode } from "react";

interface Props {
    children?: ReactNode
}

const queryClient = new QueryClient()

const QueryWrapper: React.FC<Props> = ({children}) => (
    <QueryClientProvider client={queryClient}>
        {children}
    </QueryClientProvider>
)

export default QueryWrapper;