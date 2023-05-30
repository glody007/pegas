'use client'

import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
import {signOut} from 'next-auth/react'
import { useState } from 'react'
import { useRouter } from 'next/navigation';

export default function Logged(){ 
    const router = useRouter() 
    const [loading, setLoading] = useState(false)

    const logout = async () => {
        setLoading(true)
        signOut()
            .catch((error) => {
                console.log(error)
            })
            .finally(() => {
                setLoading(false)
            }) 
    }

    return (
        <div className="flex space-x-4">
            <Button 
                disabled={loading}
                variant="outline" onClick={() => logout()}
            >
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Sign out
            </Button>
            <Button onClick={() =>  router.push('/dashboard')}>
                Dashboard
            </Button>
        </div>
    )
}