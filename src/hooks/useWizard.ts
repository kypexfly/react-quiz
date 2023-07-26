import { useState } from "react"

const useWizard = (numberOfSteps: number) => {
  const [step, setStep] = useState<number>(0)

  const handleNext = () => {
    if (step < numberOfSteps - 1) {
      setStep(step + 1)
    }
  }

  const handlePrevious = () => {
    if (step > 0) {
      setStep(step - 1)
    }
  }

  return {
    step,
    setStep,
    handleNext,
    handlePrevious,
  }
}

export default useWizard
