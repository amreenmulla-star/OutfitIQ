import type { VercelRequest, VercelResponse } from '@vercel/node'
import { eq, and, desc } from 'drizzle-orm'
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

  if (req.method === 'GET') {
    const items = await db
      .select()
      .from(clothingItems)
      .where(eq(clothingItems.userId, user.id))
      .orderBy(desc(clothingItems.createdAt))
    return res.status(200).json({ items })
  }

  if (req.method === 'POST') {
    const parsed = clothingItemSchema.safeParse(req.body)
    if (!parsed.success) {
      return res.status(400).json({ error: parsed.error.flatten().fieldErrors })
    }

    const data = parsed.data
    const [item] = await db
      .insert(clothingItems)
      .values({
        userId: user.id,
        name: data.name,
        category: data.category,
        colour: data.colour,
        season: data.season,
        occasion: data.occasion,
        imageUrl: data.imageUrl || null,
      })
      .returning()

    return res.status(201).json({ item })
  }

  return res.status(405).json({ error: 'Method not allowed' })
}
