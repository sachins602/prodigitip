import { Skeleton } from "../ui/skeleton";

export function SkeletonVariants() {
  return (
    <div className="flex mx-auto items-center space-x-8">
      <Skeleton className="h-24 w-24 rounded-full" />
      <div className="space-y-4">
        <Skeleton className="h-9 w-[350px]" />
        <Skeleton className="h-9 w-[300px]" />
      </div>
    </div>
  );
}
