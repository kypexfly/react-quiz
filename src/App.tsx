import "@/styles/globals.css"
import { useQuery } from "@tanstack/react-query"
import { Question } from "api/_data"
import Paper from "./components/ui/Paper"
import { Skeleton } from "./components/ui/Skeleton"
import BaseLayout from "./layouts/BaseLayout"

function App() {
  const { data, isError, isLoading } = useQuery({
    queryKey: ["questions"],
    queryFn: async () => {
      const res = await fetch("/api/questions")
      const data = (await res.json()) as Promise<Question[]>
      return data
    },
  })

  return (
    <BaseLayout>
      <Paper className="h-full">
        <div className="space-y-4">
          {isLoading && <QuestionSkeleton />}
          {!isLoading && (
            <>
              {data?.map((question, i) => (
                <div key={i}>
                  <p className="font-bold">{`${i + 1}. ${question[0]}`}</p>
                  <div className="my-6 grid grid-cols-2 gap-4">
                    {question[1].map((answer, i) => (
                      <div
                        key={`answer-${i}`}
                        className="flex items-center rounded border border-gray-200 pl-4"
                      >
                        <input
                          id="bordered-radio-1"
                          type="radio"
                          name="bordered-radio"
                          className="h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500"
                        />
                        <label
                          htmlFor="bordered-radio-1"
                          className="ml-2 w-full py-4 text-sm font-medium text-gray-900"
                        >
                          {answer}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </>
          )}
          {isError && "Something wen wrong"}
        </div>
      </Paper>
    </BaseLayout>
  )
}

const QuestionSkeleton = () => {
  return (
    <div className="flex items-center space-x-4">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  )
}

export default App
