import React from "react"
import RouteList from "./route-list"
import { Route } from "@/lib/validators/route"

function getData(): Route[] {
    // Fetch data from your API here.
    return [
      {
        id: "1",
        from: "Lubumbashi",
        to: "Likasi",
        duration: 180,
        stops: ["Lubumbashi", "Kambove", "Likasi"]
      },
      {
        id: "2",
        from: "Lubumbashi",
        to: "Kolwezi",
        duration: 360,
        stops: ["Lubumbashi", "Kambove", "Likasi", "Kolwezi"]
      },
    ]
}

export default function Departure() {
    const data = getData()

    return (
        <div className="mx-auto mt-4">
            <RouteList data={data} />
        </div>
    )
}