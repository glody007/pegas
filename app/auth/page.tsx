import Login from "./Login"
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import { getServerSession } from 'next-auth/next'

export default async function page() {
    const session = await getServerSession(authOptions)
    console.log(session)
    return (
        <div>
           <Login /> 
        </div>
    )
}