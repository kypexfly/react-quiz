import { useLocalStorage } from "@mantine/hooks"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { Question } from "types"
import { cn } from "@/lib/utils"
import useWizard from "@/hooks/useWizard"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/AlertDialog"
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

  const [userResponses, setUserResponses, removeResponses] = useLocalStorage<
    number[]
  >({
    key: "userResponses",
    defaultValue: new Array(steps.length).fill(null),
  })

  const setResponses = (index: number, value: number) =>
    setUserResponses((prev) => {
      const newResponses = [...prev]
      newResponses[index] = value
      return newResponses
    })

  const currentStep = steps[step]

  const queryClient = useQueryClient()

  const { mutate: submitResponses, isLoading } = useMutation({
    mutationFn: async (userResponses: number[]) => {
      const payload = { userResponses }
      const { data } = await axios.post<SubmitResponse[]>(
        "/api/check/",
        payload
      )
      return data
    },
    onSuccess(data) {
      queryClient.setQueryData(["results"], data)
      setStep(0)
    },
  })

  const handleOnSubmit = () => {
    submitResponses(userResponses)
  }

  return (
    <>
      {/* Question navigation */}
      <Paper>
        <div className="flex justify-between">
          <h3 className="mb-3 scroll-m-20 text-xl font-semibold tracking-tight">
            All questions
          </h3>
          <Button
            onClick={() => {
              removeResponses()
              queryClient.setQueryData(["results"], null)
              setStep(0)
            }}
            variant="destructive"
            size="sm"
          >
            Reset Quiz
          </Button>
        </div>
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

      {/* Navigate next and previous questions */}
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

      {/* Current question */}
      <Paper>
        <WizardForm
          setResponses={setResponses}
          userResponses={userResponses}
          questions={currentStep.questions}
          step={step}
          handleNext={handleNext}
        />
      </Paper>

      {/* Submit button */}
      {(step === steps.length - 1 || userResponses.every((r) => r != null)) && (
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              disabled={isLoading}
              className="w-full bg-cyan-500 py-6 hover:bg-cyan-600"
            >
              {isLoading && <Icons.loader className="mr-2 animate-spin" />}{" "}
              Submit
            </Button>
          </AlertDialogTrigger>

          <AlertDialogContent>
            <AlertDialogTitle>
              Are you sure you want to submit?
            </AlertDialogTitle>
            <AlertDialogDescription>
              {!userResponses.every((r) => r != null) &&
                "You have not completed all questions. "}
              Answers will be shown after submitting.
            </AlertDialogDescription>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleOnSubmit}>
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
      {/* {data && <div className="break-all">{JSON.stringify(data)}</div>} */}
    </>
  )
}

export default Wizard
