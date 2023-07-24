import type { VercelRequest, VercelResponse } from "@vercel/node"
import { questions } from "./_data.js"

export default function handler(_req: VercelRequest, res: VercelResponse) {
  const unansweredQuestions = questions.map((question) => [
    question[0],
    question[1],
    null,
  ])
  res.status(200).json(unansweredQuestions)
}
