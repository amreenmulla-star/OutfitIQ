import type { VercelRequest, VercelResponse } from '@vercel/node'
import { eq, and, desc, inArray } from 'drizzle-orm'
import { db } from '../../server/db'
import { outfits, outfitItems, clothingItems } from '../../server/db/schema'
import { outfitSchema } from '../../server/validators/wardrobe'
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
    const userOutfits = await db
      .select()
      .from(outfits)
      .where(eq(outfits.userId, user.id))
      .orderBy(desc(outfits.createdAt))

    const result = []
    for (const outfit of userOutfits) {
      const links = await db
        .select({ clothingItemId: outfitItems.clothingItemId })
        .from(outfitItems)
        .where(eq(outfitItems.outfitId, outfit.id))

      const ids = links.map((l) => l.clothingItemId)
      const items =
        ids.length > 0
          ? await db.select().from(clothingItems).where(inArray(clothingItems.id, ids))
          : []

      result.push({ ...outfit, items })
    }

    return res.status(200).json({ outfits: result })
  }

  if (req.method === 'POST') {
    const parsed = outfitSchema.safeParse(req.body)
    if (!parsed.success) {
      return res.status(400).json({ error: parsed.error.flatten().fieldErrors })
    }

    const { name, occasion, description, clothingItemIds } = parsed.data

    // Verify ownership of all items
    const owned = await db
      .select({ id: clothingItems.id })
      .from(clothingItems)
      .where(and(eq(clothingItems.userId, user.id), inArray(clothingItems.id, clothingItemIds)))

    if (owned.length !== clothingItemIds.length) {
      return res.status(400).json({ error: 'One or more clothing items are invalid' })
    }

    const [outfit] = await db
      .insert(outfits)
      .values({
        userId: user.id,
        name,
        occasion,
        description: description || null,
      })
      .returning()

    await db.insert(outfitItems).values(
      clothingItemIds.map((cid) => ({
        outfitId: outfit.id,
        clothingItemId: cid,
      }))
    )

    return res.status(201).json({ outfit })
  }

  return res.status(405).json({ error: 'Method not allowed' })
}
