import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns";

export type Notification = {
    id: number
    state: "pending" | "viewed"
    message: string
}

const data: Array<Notification> = [
    {
        id: 1,
        state: "pending",
        message: "LP-400 stopped in Lubumbashi"
    },
    {
        id: 1,
        state: "pending",
        message: "LP-400 stopped in Lubumbashi"
    },
    {
        id: 1,
        state: "pending",
        message: "LP-400 stopped in Lubumbashi"
    },
    {
        id: 1,
        state: "pending",
        message: "LP-400 stopped in Lubumbashi"
    },
    {
        id: 1,
        state: "pending",
        message: "LP-400 stopped in Lubumbashi"
    },
    {
        id: 1,
        state: "viewed",
        message: "LP-400 stopped in Lubumbashi"
    },
    {
        id: 1,
        state: "pending",
        message: "LP-400 stopped in Lubumbashi"
    },
] 

export default function Notifications() {
    return (
        <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-blueGray-700">
        <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full max-w-full flex-grow flex-1">
               <h6 className="uppercase text-blueGray-100 mb-1 text-xs font-semibold">
                    Overview
               </h6>
              <h2 className="text-blueGray-100 text-xl font-semibold">Notifications</h2>
            </div>
          </div>
        </div>
        <div className="p-4 flex-auto">
          {/* Chart */}
          <div className="relative h-[400px] space-y-2">
            {data.map((notification) => (
                <div className="flex items-center space-x-2">
                    <div className={`w-2 h-2 rounded-full ${notification.state === "pending" ? `bg-green-400` : `bg-red-400`}`}></div>
                    <div className="text-gray text-xs">{notification.message}</div>
                </div> 
            ))}
          </div>
        </div>
      </div>
    )
}