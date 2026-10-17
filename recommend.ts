import type { VercelRequest, VercelResponse } from '@vercel/node'
import { eq } from 'drizzle-orm'
import { db } from '../server/db'
import { clothingItems } from '../server/db/schema'
import { recommendSchema } from '../server/validators/wardrobe'
import { generateSuggestions } from '../server/services/recommend'
import { getSessionUser } from '../server/services/auth'
import { getCookie } from './_lib/response'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const token = getCookie(
    new Request('http://local', { headers: { cookie: req.headers.cookie || '' } }),
    'session'
  )
  if (!token) return res.status(401).json({ error: 'Authentication required' })

  const user = await getSessionUser(token)
  if (!user) return res.status(401).json({ error: 'Session expired' })

  const parsed = recommendSchema.safeParse(req.body)
  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.flatten().fieldErrors })
  }

  const items = await db
    .select()
    .from(clothingItems)
    .where(eq(clothingItems.userId, user.id))

  const suggestions = generateSuggestions({
    items,
    occasion: parsed.data.occasion,
    preferredColours: parsed.data.preferredColours,
    weather: parsed.data.weather,
  })

  return res.status(200).json({ suggestions })
}
