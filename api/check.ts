import type { VercelRequest, VercelResponse } from "@vercel/node"
import { z } from "zod"
import { questions } from "./_data.js"

export default function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const { userResponses } = z
      .object({
        userResponses: z.array(z.union([z.number(), z.null()])),
      })
      .parse(req.body)

    const answers = questions.map((question) => [question[2]])

    if (userResponses.length !== answers.length) {
      return res.status(400).json({
        message: "Invalid request",
      })
    }

    const quizResults = answers.map((a, index) => {
      const userResponse = userResponses[index]
      return {
        correct: userResponse === a[0],
        answer: a[0],
      } as const
    })

    res.status(200).json(quizResults)
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({ error: err.message })
    }

    res.status(500).json({ message: "ERROR" })
  }
}
