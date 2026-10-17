import type { VercelRequest, VercelResponse } from '@vercel/node'
import { loginSchema } from '../../server/validators/auth'
import { loginUser } from '../../server/services/auth'
import { setSessionCookie } from '../_lib/response'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const parsed = loginSchema.safeParse(req.body)
    if (!parsed.success) {
      return res.status(400).json({ error: 'Invalid email or password' })
    }

    const { email, password } = parsed.data
    const { user, token } = await loginUser(email, password)

    res.setHeader('Set-Cookie', setSessionCookie(token))
    return res.status(200).json({ user })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Login failed'
    if (message === 'INVALID_CREDENTIALS') {
      return res.status(401).json({ error: 'Invalid email or password' })
    }
    console.error('Login error:', message)
    return res.status(500).json({ error: 'Unable to sign in' })
  }
}
