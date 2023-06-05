import React from 'react'
import { Checkbox } from './ui/checkbox'

type Props = {}

const budgets = [
  {
    id: "<10",
    range: [0, 10],
    label: " < US$10",
  },
  {
    id: "10-50",
    range: [10, 50],
    label: "US$10 - US$50",
  },
  {
    id: "50-100",
    range: [50, 100],
    label: "US$50 - US$100",
  },
  {
    id: "100-200",
    range: [100, 200],
    label: "US$100 - US$200",
  },
  {
    id: "200-500",
    range: [200, 500],
    label: "US$200 - US$500",
  },
  {
    id: ">500",
    range: [500, 10000000],
    label: "US$500 +",
  }
] as const

const hours = [
  {
    id: "6h - 8h",
    range: [6, 8],
    label: "6h-8h",
  },
  {
    id: "8h - 10h",
    range: [8, 10],
    label: "8h-10h",
  },
  {
    id: "10h-12h",
    range: [10, 12],
    label: "10h-12h",
  },
  {
    id: "12h - 14h",
    range: [12, 14],
    label: "12h - 14h",
  },
  {
    id: "14h - 16h",
    range: [14, 16],
    label: "14h - 16h",
  },
  {
    id: "16h - 18h",
    range: [16, 18],
    label: "16h - 18h",
  },
] as const

const classes = [
  {
    id: "classic",
    label: "Classic" 
  },
  {
    id: "VIP",
    label: "vip" 
  }
] as const

export default function PassengerSearchFilter({}: Props) {
  return (
    <div className="flex-1 flex flex-col border rounded-xl">
        <div className="flex border-b p-2">
            <p className="font-semibold">Filtres:</p>
        </div>
        <div className="flex flex-col border-b space-y-2 p-2">
          <div>
            <p className="text-sm font-semibold">Bugdet</p>
          </div>
          {budgets.map(budget => (
            <div className="items-center flex space-x-2">
              <Checkbox id="budgets" />
              <div className="grid gap-1.5 leading-none">
                <label
                  htmlFor="budgets"
                  className="text-sm font-small leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {budget.label}
                </label>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col border-b space-y-2 p-2">
          <div>
            <p className="text-sm font-semibold">Classes</p>
          </div>
          {classes.map(classe => (
            <div className="items-center flex space-x-2">
              <Checkbox id="classes" />
              <div className="grid gap-1.5 leading-none">
                <label
                  htmlFor="classes"
                  className="text-sm font-small leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {classe.label}
                </label>
              </div>
            </div>
          ))} 
        </div>

        <div className="flex flex-col border-b space-y-2 p-2">
          <div>
            <p className="text-sm font-semibold">Heures</p>
          </div>
          {hours.map(hour => (
            <div className="items-center flex space-x-2">
              <Checkbox id="hours" />
              <div className="grid gap-1.5 leading-none">
                <label
                  htmlFor="hours"
                  className="text-sm font-small leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {hour.label}
                </label>
              </div>
            </div>
          ))} 
        </div>
    </div>
  )
}