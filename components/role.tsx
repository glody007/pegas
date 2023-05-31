import { Role } from "@/types/role"

interface UserRoleProps {
    role: Role
}

export default function UserRole({ role }: UserRoleProps) {
    return (
        <div className={`
            p-1 w-20 flex justify-center rounded-full 
            ${role === "admin" && "bg-black text-white"}
            ${role === "controller" && "bg-gray-100"}
            ${role === "driver" && "bg-gray-100"}
            ${role === "passenger" && "border"}
            ${role === "seller" && "bg-gray-100"}
        `}> 
            {role}
        </div>
    )
}