'use client'

import { Button } from '@/components/ui/button'
import {signOut} from 'next-auth/react'

export default function Logged(){ 
    
    return (
        <Button variant="outline" onClick={() => signOut()}>
            Sign out
        </Button>
    )
}