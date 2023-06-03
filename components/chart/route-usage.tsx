"use client"

import React from "react";
import Chart from "chart.js";
import { ChartConfiguration } from "chart.js";
import { format } from "date-fns";
import { allRoutes } from "@/service/route";
import { SkeletonCard } from "../SkeletonCard";
import { useQuery } from "react-query";

export default function RouteUsage() {
  const { data: response, error, isLoading } = useQuery({
    queryFn: allRoutes,
    queryKey: ["routes"]
  })

  React.useEffect(() => {
    let config: ChartConfiguration = {
      type: "doughnut",
      data: {
        datasets: [{
            data: [10, 20, 30],
            backgroundColor: [
                '#f87171',
                '#fde047',
                '#22d3ee'
            ],
        }],
        // These labels appear in the legend and in the tooltips when hovering different arcs
        labels: [
            'Red',
            'Yellow',
            'Blue'
        ]
      }
    };
    const canvas = document.getElementById("doughnut") as HTMLCanvasElement
    let ctx = canvas?.getContext("2d");
    if(ctx) window.myDoughnut = new Chart(ctx, config);
  }, [response, error, isLoading]);

  if(isLoading) return (
    <div className="h-full w-full">
      <SkeletonCard />
      <div className="w-[0px] h-[0px]">
        <canvas id="doughnut"></canvas>
      </div>
    </div>
  )

  return (
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full h-full mb-6 shadow-lg rounded">
        <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full max-w-full flex-grow flex-1">
              <h6 className="uppercase text-blueGray-400 mb-1 text-xs font-semibold">
                View
              </h6>
              <h2 className="text-blueGray-700 text-xl font-semibold">
                Routes usage
              </h2>
            </div>
          </div>
        </div>
        <div className="p-4 flex-auto">
          {/* Chart */}
          <div className="relative h-350-px">
            <canvas id="doughnut"></canvas>
          </div>
        </div>
      </div>
  );
}