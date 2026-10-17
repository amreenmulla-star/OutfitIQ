import type { VercelRequest, VercelResponse } from '@vercel/node'
import { registerSchema } from '../../server/validators/auth'
import { registerUser } from '../../server/services/auth'
import { setSessionCookie } from '../_lib/response'

// Vercel serverless handler (Node.js runtime)
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const parsed = registerSchema.safeParse(req.body)
    if (!parsed.success) {
      return res.status(400).json({ error: parsed.error.flatten().fieldErrors })
    }

    const { name, email, password } = parsed.data
    const { user, token } = await registerUser(name, email, password)

    res.setHeader('Set-Cookie', setSessionCookie(token))
    return res.status(201).json({ user })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Registration failed'
    if (message === 'EMAIL_EXISTS') {
      return res.status(409).json({ error: 'An account with this email already exists' })
    }
    console.error('Register error:', message)
    return res.status(500).json({ error: 'Unable to create account' })
  }
}
