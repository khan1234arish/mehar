import { prisma } from '@/lib/prisma';

interface RateLimitResult {
  allowed: boolean;
  remainingAttempts: number;
  resetTime: Date;
}

// In-memory fallback map for environments where DB is temporarily offline
const memCache = new Map<string, { points: number; expireAt: number }>();

export async function checkRateLimit(
  key: string,
  maxPoints = 5,
  windowSeconds = 900 // 15 minutes
): Promise<RateLimitResult> {
  const now = new Date();
  const expireAt = new Date(now.getTime() + windowSeconds * 1000);

  // 1. Try Persistent Database Rate Limiting
  try {
    if (prisma) {
      const record = await prisma.rateLimit.findUnique({
        where: { key },
      });

      if (!record || record.expireAt < now) {
        // No active limit or expired — create or reset
        await prisma.rateLimit.upsert({
          where: { key },
          create: {
            key,
            points: 1,
            expireAt,
          },
          update: {
            points: 1,
            expireAt,
          },
        });

        return {
          allowed: true,
          remainingAttempts: maxPoints - 1,
          resetTime: expireAt,
        };
      }

      if (record.points >= maxPoints) {
        return {
          allowed: false,
          remainingAttempts: 0,
          resetTime: record.expireAt,
        };
      }

      // Increment points
      const updated = await prisma.rateLimit.update({
        where: { key },
        data: {
          points: { increment: 1 },
        },
      });

      return {
        allowed: updated.points <= maxPoints,
        remainingAttempts: Math.max(0, maxPoints - updated.points),
        resetTime: updated.expireAt,
      };
    }
  } catch (dbError) {
    console.warn('Database rate limit check fallback to in-memory:', dbError);
  }

  // 2. In-Memory Fallback
  const cached = memCache.get(key);
  const nowMs = Date.now();

  if (!cached || cached.expireAt < nowMs) {
    memCache.set(key, { points: 1, expireAt: nowMs + windowSeconds * 1000 });
    return {
      allowed: true,
      remainingAttempts: maxPoints - 1,
      resetTime: new Date(nowMs + windowSeconds * 1000),
    };
  }

  cached.points += 1;
  memCache.set(key, cached);

  return {
    allowed: cached.points <= maxPoints,
    remainingAttempts: Math.max(0, maxPoints - cached.points),
    resetTime: new Date(cached.expireAt),
  };
}

export async function resetRateLimit(key: string): Promise<void> {
  memCache.delete(key);
  try {
    if (prisma) {
      await prisma.rateLimit.deleteMany({
        where: { key },
      });
    }
  } catch {
    // Ignore cleanup errors
  }
}
