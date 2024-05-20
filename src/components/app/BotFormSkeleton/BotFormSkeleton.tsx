import { Skeleton } from "@/components/ui/skeleton"

export default function BotFormSkeleton() {
  return (
    <form>
      <div className="flex flex-col items-center justify-center">
        <div className="grid grid-cols-2 p-2 gap-4 sm:p-4 sm:w-[50%] w-full">
          <div>
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-10 w-full mt-2" />
          </div>
          <div>
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-10 w-full mt-2" />
          </div>
          <div>
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-10 w-full mt-2" />
          </div>
          <div>
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-10 w-full mt-2" />
          </div>
          <div className="col-span-2">
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-10 w-full mt-2" />
          </div>
        </div>
        <div className="flex items-center justify-center p-2 gap-2">
          <Skeleton className="h-10 w-48" />
          <Skeleton className="h-10 w-20 ml-4" />
        </div>
      </div>
      <div className="flex items-center justify-center p-2">
        <Skeleton className="h-24 w-[400px]" />
      </div>
    </form>
  );
}