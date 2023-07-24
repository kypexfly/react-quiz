import { useLocalStorage } from "@mantine/hooks"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { Question } from "types"
import { cn } from "@/lib/utils"
import useWizard from "@/hooks/useWizard"
import { SubmitResponse } from "../../validators"
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
}

const Wizard = ({ steps }: WizardProps) => {
  const { step, setStep, handleNext, handlePrevious } = useWizard(steps.length)

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

  const {
    mutate: submitResponses,
    data,
    isLoading,
  } = useMutation({
    mutationFn: async (userResponses: number[]) => {
      const payload = { userResponses }
      const { data } = await axios.post<SubmitResponse>("/api/check/", payload)
      return data
    },
    onSuccess() {
      setStep(0)
    },
  })

  const handleOnSubmit = () => {
    submitResponses(userResponses)
  }

  return (
    <>
      <Paper>
        <div>{JSON.stringify(userResponses)}</div>
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
      {(step === steps.length - 1 || userResponses.every((r) => r != null)) && (
        <Button
          disabled={isLoading}
          className="w-full bg-cyan-500 py-6 hover:bg-cyan-600"
          onClick={handleOnSubmit}
        >
          {isLoading && <Icons.loader className="mr-2 animate-spin" />} Submit
        </Button>
      )}
      {data && <div>{JSON.stringify(data)}</div>}
    </>
  )
}

export default Wizard
