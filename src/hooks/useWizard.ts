import { useState } from "react"

const useWizard = (numberOfSteps: number) => {
  const [step, setStep] = useState<number>(0)

  const handleNext = () => {
    if (step < numberOfSteps - 1) {
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

  return {
    step,
    setStep,
    handleNext,
    handlePrevious,
  }
}

export default useWizard
