import { Role } from "@/types/role"

interface UserRoleProps {
    role: Role
}

export default function UserRole({ role }: UserRoleProps) {
    return (
        <div className={`
            p-1 w-20 flex justify-center text-white rounded-full 
            ${role === "admin" && "bg-black"}
            ${role === "controller" && "bg-violet-600"}
            ${role === "driver" && "bg-blue-600"}
            ${role === "passenger" && "bg-indigo-400"}
            ${role === "seller" && "bg-blue-900"}
        `}> 
            {role}
        </div>
    )
}