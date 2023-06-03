import { Skeleton } from "@/components/ui/skeleton"

export function SkeletonCard() {
  return (
    <div className="w-full h-full flex flex-col">
        <Skeleton className="w-full h-full rounded" />
    </div>
  )
}
