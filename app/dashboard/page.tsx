import IncomePerYear from "@/components/chart/income-per-year"
import RouteUsage from "@/components/chart/route-usage"
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

export default function Home() {
  return (
    <div className="grid grid-rows-6 grid-cols-4 gap-4">
        <div className="row-span-2 rounded-xl">
            <SalePerYear />
        </div>
        <div className="row-span-2 rounded-xl">
            <RouteUsage />
        </div>
        <div className="bg-indigo-600 rounded-xl">
            <Card className="h-full flex justify-between">
                <div>
                    <CardTitle>Counter</CardTitle>
                    <div className="mt-2">
                        <div className="text-2xl font-bold text-slate-500">
                            23
                        </div>
                        <div className="text-xs text-gray-500 mt-2">
                            This month
                        </div>
                    </div>
                </div>
            </Card>
        </div>
        <div className="bg-indigo-600 rounded-xl">
            <Card className="h-full flex justify-between">
                <div>
                    <CardTitle>Fleet</CardTitle>
                    <div className="mt-2">
                        <div className="text-2xl font-bold text-sky-500">
                            30
                        </div>
                        <div className="text-xs text-gray-500 mt-2">
                            This month
                        </div>
                    </div>
                </div>
            </Card>
        </div>
        <div className="bg-indigo-600 rounded-xl">
            <Card className="h-full flex justify-between">
                <div>
                    <CardTitle>Departure</CardTitle>
                    <div className="mt-2">
                        <div className="text-2xl font-bold text-yellow-500">
                            10
                        </div>
                        <div className="text-xs text-gray-500 mt-2">
                            This month
                        </div>
                    </div>
                </div>
            </Card>
        </div>
        <div className="bg-indigo-600 rounded-xl">
            <Card className="h-full flex justify-between">
                <div>
                    <CardTitle>User</CardTitle>
                    <div className="mt-2">
                        <div className="text-2xl font-bold text-red-400">
                            50
                        </div>
                        <div className="text-xs text-gray-500 mt-2">
                            This month
                        </div>
                    </div>
                </div>
            </Card>
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
