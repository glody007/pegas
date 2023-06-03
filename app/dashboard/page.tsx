import Fleet from "@/components/chart/fleet"
import Counter from "@/components/chart/counter"
import IncomePerYear from "@/components/chart/income-per-year"
import RouteUsage from "@/components/chart/route-usage"
import Departure from "@/components/chart/departure"
import SalePerYear from "@/components/chart/sale-per-year"
import Notifications from "@/components/notifications"
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { 
    DesktopComputerIcon,
    UserIcon,
    OfficeBuildingIcon,
    MapIcon
 } from "@heroicons/react/solid";
import { Card } from "@tremor/react"
import { Icon } from "@tremor/react"
import User from "@/components/chart/user"
import Ticket from "@/components/chart/ticket"

export default function Home() {
  return (
    <div className="grid grid-rows-6 grid-cols-4 gap-4">
        <div className="row-span-2 rounded-xl">
            <SalePerYear />
        </div>
        <div className="row-span-2 rounded-xl">
            <RouteUsage />
        </div>
        <div className="rounded-xl">
            <Ticket />
        </div>
        <div className="rounded-xl">
            <Fleet />
        </div>
        <div className="rounded-xl">
            <Counter />
        </div>
        <div className="rounded-xl">
            <User />
        </div>
        <div className="row-span-4 col-span-3 rounded-xl">
            <IncomePerYear />
        </div>
        <div className="row-span-4 rounded-xl">
            <Notifications />
        </div>
    </div>
  )
}
