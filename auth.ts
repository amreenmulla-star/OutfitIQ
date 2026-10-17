import { getSessionUser } from '../../server/services/auth'
import { getCookie } from './response'

export async function requireUser(req: Request) {
  const token = getCookie(req, 'session')
  if (!token) return null
  return getSessionUser(token)
}
