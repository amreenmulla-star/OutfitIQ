import type { VercelRequest, VercelResponse } from '@vercel/node'
import { eq } from 'drizzle-orm'
import { db } from '../server/db'
import { earlyAccessSignups } from '../server/db/schema'
import { earlyAccessSchema } from '../server/validators/auth'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const parsed = earlyAccessSchema.safeParse(req.body)
    if (!parsed.success) {
      return res.status(400).json({ error: parsed.error.flatten().fieldErrors })
    }

    const { name, email, interestCategory, consent } = parsed.data

    const existing = await db
      .select({ id: earlyAccessSignups.id })
      .from(earlyAccessSignups)
      .where(eq(earlyAccessSignups.email, email))
      .limit(1)

    if (existing.length > 0) {
      return res.status(409).json({ error: 'This email is already registered for early access' })
    }

    await db.insert(earlyAccessSignups).values({
      name,
      email,
      interestCategory: interestCategory ?? null,
      consent,
    })

    return res.status(201).json({
      message: 'Thanks for joining the OutfitIQ early access list.',
    })
  } catch (err) {
    console.error('Early access error:', err)
    return res.status(500).json({ error: 'Unable to complete registration' })
  }
}
