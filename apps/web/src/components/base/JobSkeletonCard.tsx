import { Skeleton } from '../ui/skeleton';

export default function JobSkeletonCard({ length }: { length: number }) {
  return Array.from({ length }).map((_, i) => (
    <div className="flex flex-col w-full bg-background border rounded-lg cursor-pointer p-2 gap-2" key={i}>
      <div className="flex justify-between">
        <Skeleton className="w-12 h-12" />
        <Skeleton className="w-8 h-8" />
      </div>
      <Skeleton className="w-72 h-6" />
      <Skeleton className="w-56 h-6" />
      <Skeleton className="w-14 h-6" />
      <Skeleton className="w-52 h-16" />
    </div>
  ));
}
