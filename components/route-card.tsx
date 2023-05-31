import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Route } from "@/lib/validators/route"

interface RouteCardProps {
    route: Route
}

export default function RouteCard({ route }: RouteCardProps) {
    return (
        <Card>
            <CardContent className="flex mt-4 h-40 space-x-4">
                <div className="flex-[0.3] flex flex-col justify-between">
                <h2 className="text-lg font-bold">{route.from} - {route.to}</h2>
                <div className="">
                    <div className="text-xs text-gray-500">Boarding - Dropping</div>
                    <div className="mt-1">
                        <Badge variant="secondary">{route.from} - {route.to}</Badge> 
                    </div>
                    <div className="text-xs text-gray-500 mt-2">Time</div>
                    <div className="mt-1">
                        <Badge>{route.duration}</Badge> 
                    </div>
                </div>
                </div>
                <div className="flex-[0.3] flex flex-col">
                <div>
                    <Badge variant="outline">Map of the road</Badge>
                </div>
                <div className="flex-1 bg-gray-100 flex flex-col justify-between rounded-xs mt-2 p-4">
                    <div className="text-xs">
                        GPS and internet are unavailable, road is 100Km 
                    </div>
                    <div className="text-xs text-gray-500">
                        More details
                    </div>
                </div>
                </div>
                <div className="flex-[0.6] flex flex-col">
                    <div className="relative flex-1 flex flex-col justify-center">
                        <div className="absolute top-[46%] w-full flex h-2 rounded-xl bg-blue-200" />
                        <div className="z-50 flex justify-between items-center">
                            {route.stops.map((place, index) => (
                                <div className="relative bg-blue-200 rounded-full">
                                    <div className="m-2 w-8 h-8 text-white flex items-center justify-center bg-blue-400 rounded-full">
                                        {index + 1}
                                    </div>
                                    <div className="absolute flex text-xs text-gray-400">
                                        {place}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <Button variant="outline">Update route</Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}