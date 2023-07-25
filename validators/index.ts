import { z } from "zod"

export const SubmitRequestValidator = z.object({
  userResponses: z.array(z.union([z.number(), z.null()])),
})

const SubmitResponseValidator = z.object({
  correct: z.boolean(),
  answer: z.string(),
})

export type SubmitResponse = z.infer<typeof SubmitResponseValidator>
