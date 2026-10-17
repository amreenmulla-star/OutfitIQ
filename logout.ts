import type { VercelRequest, VercelResponse } from '@vercel/node'
import { destroySession } from '../../server/services/auth'
import { getCookie, clearSessionCookie } from '../_lib/response'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const token = getCookie(
    new Request('http://local', { headers: { cookie: req.headers.cookie || '' } }),
    'session'
  )
  if (token) {
    await destroySession(token)
  }

  res.setHeader('Set-Cookie', clearSessionCookie())
  return res.status(200).json({ ok: true })
}
