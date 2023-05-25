import IncomePerYear from "@/components/chart/income-per-year"
import RouteUsage from "@/components/chart/route-usage"
import SalePerYear from "@/components/chart/sale-per-year"
import Notifications from "@/components/notifications"

export default function Home() {
  return (
    <div className="grid grid-rows-6 grid-cols-4 gap-4">
        <div className="row-span-2 rounded-xl h-60">
            <SalePerYear />
        </div>
        <div className="row-span-2 bg-indigo-600 rounded-xl">
            <RouteUsage />
        </div>
        <div className="bg-indigo-600 rounded-xl">03</div>
        <div className="bg-indigo-600 rounded-xl">04</div>
        <div className="bg-indigo-600 rounded-xl">05</div>
        <div className="bg-indigo-600 rounded-xl">06</div>
        <div className="row-span-4 col-span-3 rounded-xl">
            <IncomePerYear />
        </div>
        <div className="row-span-4 rounded-xl">
            <Notifications />
        </div>
    </div>
  )
}
