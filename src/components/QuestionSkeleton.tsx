import { Skeleton } from "./ui/Skeleton"

const QuestionSkeleton = ({ repeat = 1 }: { repeat?: number }) => {
  return Array(repeat)
    .fill(0)
    .map((_, index) => {
      return (
        <div key={index} className="flex flex-col items-center space-y-4">
          <Skeleton className="h-6 w-full" />
          <div className="my-6 grid w-full grid-cols-2 gap-4">
            <Skeleton className="h-12" />
            <Skeleton className="h-12" />
            <Skeleton className="h-12" />
            <Skeleton className="h-12" />
          </div>
        </div>
      )
    })
}

export default QuestionSkeleton
