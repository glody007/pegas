import { authOptions } from '@/pages/api/auth/[...nextauth]'
import { getServerSession } from 'next-auth'
import Logged from './Logged'
import Login from './Login'

export default async function Nav(){
    const session = await getServerSession(authOptions)

    return (
        <div className="flex space-x-4">
            {!session?.user && <Login />}
            {session?.user && <Logged />}
        </div>
    )
}