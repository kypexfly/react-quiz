import Paper from "./ui/Paper"
import { Skeleton } from "./ui/Skeleton"

const InterfaceSkeleton = () => {
  return (
    <>
      <Paper>
        <div className="mb-4 flex flex-wrap gap-3">
          {new Array(30).fill(null).map((_, index) => (
            <Skeleton
              key={index}
              className="flex h-10 w-10 items-center justify-center border-4 border-transparent bg-zinc-200 text-lg font-bold"
            />
          ))}
        </div>
      </Paper>

      <div className="flex justify-between gap-3">
        <Skeleton className="flex-1 bg-zinc-200 py-6" />
        <Skeleton className="flex-1 bg-zinc-200 py-6"></Skeleton>
      </div>

      <Paper>
        <div className="space-y-4">
          <QuestionSkeleton />
        </div>
      </Paper>
    </>
  )
}

const QuestionSkeleton = ({ repeat = 1 }: { repeat?: number }) => {
  return Array(repeat)
    .fill(0)
    .map((_, index) => {
      return (
        <div key={index} className="flex flex-col items-center space-y-4">
          <Skeleton className="h-6 w-full" />
          <div className="my-6 grid w-full gap-4">
            <Skeleton className="h-12" />
            <Skeleton className="h-12" />
            <Skeleton className="h-12" />
            <Skeleton className="h-12" />
          </div>
        </div>
      )
    })
}

export default InterfaceSkeleton
