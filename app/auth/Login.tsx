'use client'

import { Button } from '@/components/ui/button'
import {signIn, signOut} from 'next-auth/react'

export default  function Login(){    
    return (
        <li className="">
            <Button onClick={async () => await signIn()}>
                Sign In
            </Button>
            <Button onClick={async () => await signOut()}>
                Sign out
            </Button>
        </li>
    )
}