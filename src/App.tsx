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
          {isLoading && <QuestionSkeleton repeat={5} />}
          {!isLoading && data && <Formulary questions={data.slice(0,5)} />}
          {isError && "Something wen wrong"}
        </div>
      </Paper>
    </BaseLayout>
  )
}

const Formulary = ({ questions }: { questions: Question[] }) => {
  return (
    <form>
      {questions.map((q, i) => {
        return (
          <>
            <p className="font-bold">{`${i + 1}. ${q[0]}`}</p>
            <div className="my-6 grid grid-cols-2 gap-4">
              {q[1].map((answer, j) => (
                <fieldset
                  id={`question-${i + 1}}`}
                  key={`answer-${j}`}
                  className="flex items-center rounded border border-gray-200 pl-4"
                >
                  <input
                    id={`radio-q${i + 1}-${j + 1}`}
                    type="radio"
                    name={`question-${i + 1}}`}
                    className="h-4 w-4 border-gray-300 bg-gray-100 text-blue-600"
                  />
                  <label
                    htmlFor={`radio-q${i + 1}-${j + 1}`}
                    className="ml-2 w-full py-4 text-sm font-medium text-gray-900"
                  >
                    {answer}
                  </label>
                </fieldset>
              ))}
            </div>
          </>
        )
      })}
    </form>
  )
}

const QuestionSkeleton = ({ repeat = 1 }: { repeat?: number }) => {
  return Array(repeat)
    .fill(0)
    .map((_, i) => {
      return (
        <div key={i} className="flex flex-col items-center space-y-4">
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

export default App
