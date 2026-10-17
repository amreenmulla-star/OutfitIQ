import bcrypt from 'bcryptjs'
import { randomBytes } from 'crypto'
import { eq, and, gt } from 'drizzle-orm'
import { db } from '../db'
import { users, sessions } from '../db/schema'

const SESSION_DAYS = 14
const SALT_ROUNDS = 12

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, SALT_ROUNDS)
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash)
}

export function generateToken(): string {
  return randomBytes(48).toString('hex')
}

export async function createSession(userId: string): Promise<string> {
  const token = generateToken()
  const expiresAt = new Date()
  expiresAt.setDate(expiresAt.getDate() + SESSION_DAYS)

  await db.insert(sessions).values({
    userId,
    token,
    expiresAt,
  })

  return token
}

export async function getSessionUser(token: string) {
  if (!token) return null

  const result = await db
    .select({
      id: users.id,
      name: users.name,
      email: users.email,
      sessionId: sessions.id,
    })
    .from(sessions)
    .innerJoin(users, eq(sessions.userId, users.id))
    .where(and(eq(sessions.token, token), gt(sessions.expiresAt, new Date())))
    .limit(1)

  return result[0] ?? null
}

export async function destroySession(token: string): Promise<void> {
  if (!token) return
  await db.delete(sessions).where(eq(sessions.token, token))
}

export async function registerUser(name: string, email: string, password: string) {
  const existing = await db.select({ id: users.id }).from(users).where(eq(users.email, email)).limit(1)
  if (existing.length > 0) {
    throw new Error('EMAIL_EXISTS')
  }

  const passwordHash = await hashPassword(password)
  const [user] = await db
    .insert(users)
    .values({ name, email, passwordHash })
    .returning({ id: users.id, name: users.name, email: users.email })

  const token = await createSession(user.id)
  return { user, token }
}

export async function loginUser(email: string, password: string) {
  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1)

  if (!user) {
    throw new Error('INVALID_CREDENTIALS')
  }

  const valid = await verifyPassword(password, user.passwordHash)
  if (!valid) {
    throw new Error('INVALID_CREDENTIALS')
  }

  const token = await createSession(user.id)
  return {
    user: { id: user.id, name: user.name, email: user.email },
    token,
  }
}
