import type { VercelRequest, VercelResponse } from '@vercel/node'
import { getSessionUser } from '../../server/services/auth'
import { getCookie } from '../_lib/response'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const token = getCookie(
    new Request('http://local', { headers: { cookie: req.headers.cookie || '' } }),
    'session'
  )
  if (!token) {
    return res.status(401).json({ error: 'Not authenticated' })
  }

  const user = await getSessionUser(token)
  if (!user) {
    return res.status(401).json({ error: 'Session expired' })
  }

  return res.status(200).json({
    user: { id: user.id, name: user.name, email: user.email },
  })
}
