"use client"

import { format } from "date-fns";

import React from "react";
import Chart from "chart.js";
import { ChartConfiguration } from "chart.js";
import { allTickets } from "@/service/ticket";
import { SkeletonCard } from "../SkeletonCard";
import { useQuery } from "react-query";

export default function CardLineChart() {
  const { data: response, error, isLoading } = useQuery({
    queryFn: allTickets,
    queryKey: ["tickets"]
  })

  React.useEffect(() => {
    var config: ChartConfiguration = {
      type: "line",
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
            data: [65, 78, 66, 44, 56, 67, 75],
            fill: false,
          },
          {
            label: format(new Date(), "dd/MM/yyyy"),
            fill: false,
            backgroundColor: "#3182ce",
            borderColor: "#3182ce",
            data: [40, 68, 86, 74, 56, 60, 87],
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
        title: {
          display: false,
          text: "Sales Charts",
          fontColor: "gray",
        },
        legend: {
          labels: {
            fontColor: "gray",
          },
          align: "end",
          position: "bottom",
        },
        tooltips: {
          mode: "index",
          intersect: false,
        },
        hover: {
          mode: "nearest",
          intersect: true,
        },
        scales: {
          xAxes: [
            {
              ticks: {
                fontColor: "rgba(0,0,0,.4)",
              },
              display: true,
              scaleLabel: {
                display: false,
                labelString: "Month",
                fontColor: "gray",
              },
              gridLines: {
                display: false,
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
              ticks: {
                fontColor: "rgba(0,0,0,.4)",
              },
              display: true,
              scaleLabel: {
                display: false,
                labelString: "Value",
                fontColor: "gray",
              },
              gridLines: {
                borderDash: [3],
                borderDashOffset: 3,
                drawBorder: false,
                color: "rgba(33, 37, 41, 0.3)",
                zeroLineColor: "rgba(33, 37, 41, 0.3)",
                zeroLineBorderDash: [2],
                zeroLineBorderDashOffset: 2,
              },
            },
          ],
        },
      },
    };
    const canvas = document.getElementById("line-chart") as HTMLCanvasElement
    const ctx = canvas?.getContext("2d");
    if(ctx) window.myLine = new Chart(ctx, config);
  }, [response, error, isLoading]);

  if(error) return <>error...</>

  if(isLoading) return (
    <div className="h-full w-full">
      <SkeletonCard />
      <div className="w-[0px] h-[0px]">
        <canvas id="line-chart"></canvas>
      </div>
    </div>
  )

  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-blueGray-700">
        <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full max-w-full flex-grow flex-1">
              <h6 className="uppercase text-blueGray-100 mb-1 text-xs font-semibold">
                Overview
              </h6>
              <h2 className="text-blueGray-100 text-xl font-semibold">Ventes par année</h2>
            </div>
          </div>
        </div>
        <div className="p-4 flex-auto">
          {/* Chart */}
          <div className="relative h-[400px]">
            <canvas id="line-chart"></canvas>
          </div>
        </div>
      </div>
    </>
  );
}