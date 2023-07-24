import { Fragment } from "react"
import type { Question } from "../../types"

interface WizardFormProps {
  questions: Question[]
  step: number
  userResponses: number[]
  setAnswers: (index: number, value: number) => void
}

const WizardForm = ({
  questions,
  step,
  userResponses,
  setAnswers,
}: WizardFormProps) => {
  return (
    <form>
      {questions.map((q, qIndex) => {
        const n = questions.length
        const currentQuestion = step * n + (qIndex + 1)
        return (
          <Fragment key={`q-${currentQuestion}`}>
            <p className="font-bold">{`${currentQuestion}. ${q[0]}`}</p>
            <fieldset
              id={`question-${currentQuestion}`}
              className="my-6 grid gap-4"
            >
              {["a", "b", "c", "d"].map((answer, aIndex) => (
                <div
                  key={`group-q${currentQuestion}-${aIndex + 1}`}
                  className="flex items-center rounded border border-gray-200 pl-4"
                >
                  <input
                    id={`radio-q${currentQuestion}-${aIndex + 1}`}
                    checked={userResponses[currentQuestion - 1] === aIndex}
                    onChange={() => setAnswers(currentQuestion - 1, aIndex)}
                    type="radio"
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
              ))}
            </fieldset>
          </Fragment>
        )
      })}
    </form>
  )
}

export default WizardForm
