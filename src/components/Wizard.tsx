import { useState } from "react"
import { useLocalStorage } from "@mantine/hooks"
import { Question } from "types"
import { cn } from "@/lib/utils"
import { Icons } from "./Icons"
import { Button } from "./ui/Button"
import Paper from "./ui/Paper"
import WizardForm from "./WizardForm"

export interface Step {
  title: string
  description?: string
  questions: Question[]
}

interface WizardProps {
  steps: Step[]
  // userResponses: number[]
  // setAnswers: (index: number, value: number) => void
  // onComplete: () => void
}

const Wizard = ({ steps }: WizardProps) => {
  const [step, setStep] = useState<number>(0)

  const [userResponses, setUserResponses] = useLocalStorage<number[]>({
    key: "userResponses",
    defaultValue: new Array(steps.length).fill(null),
  })

  const setAnswers = (index: number, value: number) =>
    setUserResponses((prev) => {
      const newResponses = [...prev]
      newResponses[index] = value
      return newResponses
    })

  const currentStep = steps[step]

  const handleNext = () => {
    if (step < steps.length - 1) {
      window.scrollTo(0, 0)
      setStep(step + 1)
    }
  }

  const handlePrevious = () => {
    if (step > 0) {
      window.scrollTo(0, 0)
      setStep(step - 1)
    }
  }

  const onComplete = () => {}

  const progress = (step / (steps.length - 1)) * 100

  return (
    <>
      <Paper>
        <nav className="mb-4 flex flex-wrap gap-3">
          {userResponses.map((response, index) => (
            <button
              key={`card-${index}`}
              onClick={() => setStep(index)}
              className={cn(
                "flex h-10 w-10 items-center justify-center border-4 border-transparent bg-zinc-200 text-lg font-bold",
                response != null && "bg-cyan-500 text-white",
                step === index && "border-black"
              )}
            >
              {index + 1}
            </button>
          ))}
        </nav>

        {/* <p>
          Step {step + 1} of {steps.length}
        </p>
        <div
          className="h-4 w-full rounded-full"
          style={{
            backgroundColor: "#ddd",
          }}
        >
          <div
            className="h-[inherit] rounded-full bg-cyan-500"
            style={{
              width: `${progress}%`,
            }}
          ></div>
        </div> */}
      </Paper>
      <nav className="flex justify-between gap-3">
        <Button
          className="flex-1 py-6"
          disabled={step === 0}
          onClick={handlePrevious}
        >
          <Icons.prev className="mr-2" /> Prev
        </Button>
        <Button
          className="flex-1 py-6"
          disabled={step === steps.length - 1}
          onClick={handleNext}
        >
          Next <Icons.next className="ml-2" />
        </Button>
      </nav>
      <Paper>
        <WizardForm
          setAnswers={setAnswers}
          userResponses={userResponses}
          questions={currentStep.questions}
          step={step}
        />
      </Paper>
      {step === steps.length - 1 ||
        (userResponses.every((r) => r != null) && (
          <Button
            className="w-full bg-cyan-500 py-6 hover:bg-cyan-600"
            onClick={onComplete}
          >
            Submit
          </Button>
        ))}
    </>
  )
}

export default Wizard
