import type { VercelRequest, VercelResponse } from '@vercel/node'
import { eq, and } from 'drizzle-orm'
import { db } from '../../server/db'
import { outfits, outfitItems } from '../../server/db/schema'
import { getSessionUser } from '../../server/services/auth'
import { getCookie } from '../_lib/response'

async function getUser(req: VercelRequest) {
  const token = getCookie(
    new Request('http://local', { headers: { cookie: req.headers.cookie || '' } }),
    'session'
  )
  if (!token) return null
  return getSessionUser(token)
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const user = await getUser(req)
  if (!user) return res.status(401).json({ error: 'Authentication required' })

  const id = req.query.id as string
  if (!id) return res.status(400).json({ error: 'Outfit ID required' })

  const [existing] = await db
    .select()
    .from(outfits)
    .where(and(eq(outfits.id, id), eq(outfits.userId, user.id)))
    .limit(1)

  if (!existing) return res.status(404).json({ error: 'Outfit not found' })

  if (req.method === 'DELETE') {
    await db.delete(outfitItems).where(eq(outfitItems.outfitId, id))
    await db.delete(outfits).where(eq(outfits.id, id))
    return res.status(200).json({ ok: true })
  }

  return res.status(405).json({ error: 'Method not allowed' })
}
