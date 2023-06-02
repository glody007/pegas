import { ClassValue, clsx } from "clsx"
import { isEqual } from "date-fns"
import { twMerge } from "tailwind-merge"
import { ScheduleFull } from "./validators/schedule"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function dateAreEquals(date1: Date, date2: Date) {
  return isEqual(new Date(date1.getDate(), date1.getMonth(), date1.getDay()), 
                 new Date(date2.getDate(), date2.getMonth(), date2.getDay()))
}

export function ticketPrice(schedule: ScheduleFull) {
  const routePrice = schedule.route.price
  const busTypePriceFactor = schedule.bus.class.priceFactor
  return  routePrice * busTypePriceFactor
}
