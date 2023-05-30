'use client'

import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react';
import {signIn} from 'next-auth/react'
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Login(){
    const router = useRouter() 
    const [loading, setLoading] = useState(false)

    const login = async () => {
        setLoading(true)
        signIn()
            .then((value) => {
                console.log(value)
            })
            .catch((error) => {
                console.log(error)
            })
            .finally(() => {
                setLoading(false)
            })
    }
    
    return (
        <Button 
            onClick={() => login()}
            disabled={loading}
        >
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Sign In
        </Button>
    )
}