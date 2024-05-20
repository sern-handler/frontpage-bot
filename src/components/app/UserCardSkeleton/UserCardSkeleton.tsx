import { Skeleton } from "@/components/ui/skeleton"

export default function UserCardSkeleton() {
  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-4">
      <div className="flex items-center justify-center space-x-4">
        <Skeleton className="w-14 h-14 rounded-full" />
        <Skeleton className="flex-grow text-center font-extrabold text-2xl h-6" />
      </div>
      <div className="pt-4">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full mt-2" />
      </div>
      <div className="flex justify-end mt-4 gap-4">
        <Skeleton className="h-8 w-20" />
        <Skeleton className="h-8 w-20 ml-4" />
        <Skeleton className="h-8 w-20 ml-4" />
      </div>
    </div>
  );
}