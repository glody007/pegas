import { ClassValue, clsx } from "clsx"
import { isEqual } from "date-fns"
import { twMerge } from "tailwind-merge"
import { string } from "zod"
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

function makePluralIfMany(name: String, number: Number) {
  return `${name}${number>1 ? 's' : ''}`
}

function formatTraveTimePart(name: String, number: Number) {
  return `${number>0 ? `${number} ${makePluralIfMany(name, number)}` : ''}`
}

export function scheduleTravelTime(schedule: ScheduleFull) {
 
  const DAY_TO_MINUTE = 24 * 60
  const HOUR_TO_MINUTE = 60
  const days = Math.floor(schedule.route.duration / DAY_TO_MINUTE)
  const hours = Math.floor((schedule.route.duration % DAY_TO_MINUTE) / HOUR_TO_MINUTE)
  const minutes = Math.floor(schedule.route.duration % HOUR_TO_MINUTE)
  return `${formatTraveTimePart('jour', days)} ${formatTraveTimePart('heure', hours)} ${formatTraveTimePart('minute', minutes)}`
}
