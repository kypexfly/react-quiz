import React, { useState } from "react"
// interface Question {
//   label: string
//   type: "text" | "number" | "email" | "select" | "radio" | "checkbox"
//   options?: string[]
// }

type Question = [string, string[], number]

interface Step {
  title: string
  description: string
  questions: Question[]
}

interface WizardProps {
  steps: Step[]
  onComplete: () => void
}

const Wizard = ({ steps, onComplete }: WizardProps) => {
  const [step, setStep] = useState<number>(0)

  const currentStep = steps[step]

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1)
    } else {
      onComplete()
    }
  }

  const handlePrevious = () => {
    if (step > 0) {
      setStep(step - 1)
    }
  }

  const progress = (step / (steps.length - 1)) * 100

  return (
    <div>
      <h1>{currentStep.title}</h1>
      <p>{currentStep.description}</p>
      <button onClick={handlePrevious}>Previous</button>
      <button onClick={handleNext}>Next</button>
      <div style={{ width: "100%", height: "20px", backgroundColor: "#ddd" }}>
        <div
          style={{
            width: `${progress}%`,
            height: "20px",
            backgroundColor: "#0070f3",
          }}
        ></div>
      </div>
    </div>
  )
}

export default Wizard
