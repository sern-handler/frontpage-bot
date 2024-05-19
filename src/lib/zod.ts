import { describe } from 'node:test'
import { z } from 'zod'

export const botSubmitSchema = z.object({
    id: z.string().optional(),
    name: z.string(),
    description: z.string(),
    botId: z.string(),
    inviteLink: z.string().nullable().optional(),
    srcLink: z.string().nullable().optional()
})

export const botVerificationSwitchSchema = z.object({
    id: z.string().min(1),
    verified: z.boolean()
})