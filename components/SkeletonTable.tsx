import { Skeleton } from "@/components/ui/skeleton"

export function SkeletonTable() {
  return (
    <div className="w-full flex flex-col space-y-4">
      <div className="flex justify-between">
        <div className="flex space-x-4">
          <Skeleton className="h-10 w-40" />
          <Skeleton className="h-10 w-40" />
        </div>
        <Skeleton className="h-10 w-32" />
      </div>
      <div className="w-full flex flex-col space-y-4">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
      </div>
    </div>
  )
}
