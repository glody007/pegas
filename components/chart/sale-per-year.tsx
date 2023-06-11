"use client"

import React from "react";
import Chart from "chart.js";
import { ChartConfiguration } from "chart.js";
import { format } from "date-fns";
import { allUsers } from "@/service/user";
import { useQuery } from "react-query";
import { SkeletonCard } from "../SkeletonCard";
import { allTickets } from "@/service/ticket";

export default function SalePerYear() {
  const { data: response, error, isLoading } = useQuery({
    queryFn: allTickets,
    queryKey: ["tickets"]
  })

  React.useEffect(() => {
    let config: ChartConfiguration = {
      type: "bar",
      data: {
        labels: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
        ],
        datasets: [
          {
            label: format(new Date(2022, 1, 1), "dd/MM/yyyy"),
            backgroundColor: "#4a5568",
            borderColor: "#4a5568",
            data: [30, 78, 56, 34, 100, 45, 13],
            fill: false,
            barThickness: 8,
          },
          {
            label: format(new Date(), "dd/MM/yyyy"),
            fill: false,
            backgroundColor: "#3182ce",
            borderColor: "#3182ce",
            data: [27, 68, 86, 74, 10, 4, 87],
            barThickness: 8,
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
        title: {
          display: false,
          text: "Orders Chart",
        },
        tooltips: {
          mode: "index",
          intersect: false,
        },
        hover: {
          mode: "nearest",
          intersect: true,
        },
        legend: {
          labels: {
            fontColor: "rgba(0,0,0,.4)",
          },
          align: "end",
          position: "bottom",
        },
        scales: {
          xAxes: [
            {
              display: false,
              scaleLabel: {
                display: true,
                labelString: "Month",
              },
              gridLines: {
                borderDash: [2],
                borderDashOffset: 2,
                color: "rgba(33, 37, 41, 0.3)",
                zeroLineColor: "rgba(33, 37, 41, 0.3)",
                zeroLineBorderDash: [2],
                zeroLineBorderDashOffset: 2,
              },
            },
          ],
          yAxes: [
            {
              display: true,
              scaleLabel: {
                display: false,
                labelString: "Value",
              },
              gridLines: {
                borderDash: [2],
                drawBorder: false,
                borderDashOffset: 2,
                color: "rgba(33, 37, 41, 0.2)",
                zeroLineColor: "rgba(33, 37, 41, 0.15)",
                zeroLineBorderDash: [2],
                zeroLineBorderDashOffset: 2,
              },
            },
          ],
        },
      },
    };
    const canvas = document.getElementById("bar-chart") as HTMLCanvasElement
    let ctx = canvas?.getContext("2d");
    if(ctx) window.myBar = new Chart(ctx, config);
  }, [response, error, isLoading]);

  if(error) return <>error...</>

  if(isLoading) return (
    <div className="h-full w-full">
      <SkeletonCard />
      <div className="w-[0px] h-[0px]">
        <canvas id="bar-chart"></canvas>
      </div>
    </div>
  )

  return (
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full h-full mb-6 shadow-lg rounded">
        <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full max-w-full flex-grow flex-1">
              <h6 className="uppercase text-blueGray-400 mb-1 text-xs font-semibold">
                Performance
              </h6>
              <h2 className="text-blueGray-700 text-xl font-semibold">
                Ventes
              </h2>
            </div>
          </div>
        </div>
        <div className="p-4 flex-auto">
          {/* Chart */}
          <div className="relative h-350-px">
            <canvas id="bar-chart"></canvas>
          </div>
        </div>
      </div>
  );
}