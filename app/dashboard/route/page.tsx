import React from "react"
import RouteList from "./route-list"
import { Route } from "@/lib/validators/route"

async function getData(): Promise<Route[]> {
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

export default async function Departure() {
    const data = await getData()

    return (
        <div className="mx-auto mt-4">
            <RouteList data={data} />
        </div>
    )
}