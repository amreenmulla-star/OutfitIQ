import type { VercelRequest, VercelResponse } from '@vercel/node'
import { eq, and } from 'drizzle-orm'
import { db } from '../../server/db'
import { clothingItems } from '../../server/db/schema'
import { clothingItemSchema } from '../../server/validators/wardrobe'
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
  if (!id) return res.status(400).json({ error: 'Item ID required' })

  const [existing] = await db
    .select()
    .from(clothingItems)
    .where(and(eq(clothingItems.id, id), eq(clothingItems.userId, user.id)))
    .limit(1)

  if (!existing) return res.status(404).json({ error: 'Item not found' })

  if (req.method === 'PUT' || req.method === 'PATCH') {
    const parsed = clothingItemSchema.partial().safeParse(req.body)
    if (!parsed.success) {
      return res.status(400).json({ error: parsed.error.flatten().fieldErrors })
    }

    const [item] = await db
      .update(clothingItems)
      .set({ ...parsed.data, updatedAt: new Date() })
      .where(and(eq(clothingItems.id, id), eq(clothingItems.userId, user.id)))
      .returning()

    return res.status(200).json({ item })
  }

  if (req.method === 'DELETE') {
    await db
      .delete(clothingItems)
      .where(and(eq(clothingItems.id, id), eq(clothingItems.userId, user.id)))
    return res.status(200).json({ ok: true })
  }

  return res.status(405).json({ error: 'Method not allowed' })
}
