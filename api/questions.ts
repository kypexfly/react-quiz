import type { VercelRequest, VercelResponse } from "@vercel/node"
import { questions } from "./_data.js"

export default function handler(
  _request: VercelRequest,
  response: VercelResponse
) {
  response.status(200).json(questions)
}
