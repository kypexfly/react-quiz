import { Fragment } from "react"
import { useQueryClient } from "@tanstack/react-query"
import { SubmitResponse } from "validators"
import { cn } from "@/lib/utils"
import type { Question } from "../../types"

interface WizardFormProps {
  questions: Question[]
  step: number
  userResponses: number[]
  setResponses: (index: number, value: number) => void
  handleNext: () => void
}

const WizardForm = ({
  questions,
  step,
  userResponses,
  setResponses,
  handleNext,
}: WizardFormProps) => {
  const queryClient = useQueryClient()

  const results: SubmitResponse[] | undefined = queryClient.getQueryData([
    "results",
  ])

  return (
    <>
      {questions.map((q, qIndex) => {
        const n = questions.length
        const currentQuestion = step * n + (qIndex + 1)
        return (
          <Fragment key={`q-${currentQuestion}`}>
            <p className="text-xl font-semibold">{`${currentQuestion}. ${q[0]}`}</p>

            <fieldset
              id={`question-${currentQuestion}`}
              className="my-6 grid gap-4"
            >
              {["a", "b", "c", "d"].map((answer, aIndex) => {
                const result = results && results[currentQuestion - 1]
                return (
                  <div
                    key={`group-q${currentQuestion}-${aIndex + 1}`}
                    className={cn(
                      "flex items-center rounded border border-gray-200 pl-4 :not(disabled:hover:bg-gray-100) transition-colors",
                      result &&
                        result?.correct &&
                        Number(result?.answer) === aIndex &&
                        "border-green-500 bg-green-50",
                      result &&
                        Number(result?.answer) === aIndex &&
                        "border-green-500 bg-green-50",
                      results &&
                        !result?.correct &&
                        userResponses[currentQuestion - 1] === aIndex &&
                        "border-red-500 bg-red-50"
                    )}
                  >
                    <input
                      id={`radio-q${currentQuestion}-${aIndex + 1}`}
                      checked={userResponses[currentQuestion - 1] === aIndex}
                      onChange={() => {
                        setResponses(currentQuestion - 1, aIndex)
                        handleNext()
                      }}
                      type="radio"
                      disabled={!!results}
                      name={`question-${currentQuestion}`}
                      className="h-4 w-4 border-gray-300 bg-gray-100 text-blue-600"
                    />
                    <label
                      htmlFor={`radio-q${currentQuestion}-${aIndex + 1}`}
                      className="ml-2 w-full py-4 text-sm font-medium text-gray-900"
                    >
                      {`${answer}. ${q[1][aIndex]}`}
                    </label>
                  </div>
                )
              })}
            </fieldset>
          </Fragment>
        )
      })}
    </>
  )
}

export default WizardForm
