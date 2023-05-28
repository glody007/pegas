import React from "react"
import { route } from "@/types/route"
import RouteList from "./route-list"

async function getData(): Promise<route[]> {
    // Fetch data from your API here.
    return [
      {
        id: "1",
        from: "Lubumbashi",
        to: "Likasi",
        duration: "3 hours",
        places: ["Lubumbashi", "Kambove", "Likasi"]
      },
      {
        id: "2",
        from: "Lubumbashi",
        to: "Kolwezi",
        duration: "6 hours",
        places: ["Lubumbashi", "Kambove", "Likasi", "Kolwezi"]
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