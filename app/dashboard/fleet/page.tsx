import React from "react"
import { route } from "@/types/route"
import BusList from "./Fleet"
import { Bus } from "@/lib/validators/bus"

async function getData(): Promise<Bus[]> {
    // Fetch data from your API here.
    return [
      {
        id: 1,
        name: "Y-49",
        brand: "Yuton bus",
        planId: "1",
        numberOfSeats: 60,
        photoUrl: "https://ik.imagekit.io/vbjy0pcazvn/yutong_nfKWGHAMY.jpeg?updatedAt=1685336064650"
      },
      {
        id: 1,
        name: "H-3",
        brand: "Higer bus",
        planId: "2",
        numberOfSeats: 40,
        photoUrl: "https://ik.imagekit.io/vbjy0pcazvn/higer_XB13xgbMH.png?updatedAt=1685336064695"
      },
    ]
} 

export default async function Departure() {
    const data = await getData()

    return (
        <div className="mx-auto mt-4">
            <BusList data={data} />
        </div>
    )
}