import UserCardSkeleton from "@/components/app/UserCardSkeleton/UserCardSkeleton";

export default function Loading() {
    return (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 p-4">
            {Array.from({ length: 8 }).map((_, i) => (
                <UserCardSkeleton key={i} />
            ))}
        </div>
    )
}