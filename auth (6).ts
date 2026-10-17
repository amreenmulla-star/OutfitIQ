import { z } from 'zod'

export const registerSchema = z.object({
  name: z.string().min(2).max(120).trim(),
  email: z.string().email().max(255).toLowerCase().trim(),
  password: z.string().min(8).max(128),
})

export const loginSchema = z.object({
  email: z.string().email().max(255).toLowerCase().trim(),
  password: z.string().min(1).max(128),
})

export const earlyAccessSchema = z.object({
  name: z.string().min(2).max(120).trim(),
  email: z.string().email().max(255).toLowerCase().trim(),
  interestCategory: z
    .enum(['student', 'professional', 'fashion', 'smart-home', 'other'])
    .optional(),
  consent: z.literal(true, {
    errorMap: () => ({ message: 'You must agree to the privacy policy' }),
  }),
})
