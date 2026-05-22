import { LRUCache } from 'lru-cache'
import { NextRequest, NextResponse } from 'next/server'

type Options = {
  uniqueTokenPerInterval?: number
  interval?: number
}

export default function rateLimit(options?: Options) {
  const tokenCache = new LRUCache({
    max: options?.uniqueTokenPerInterval || 500,
    ttl: options?.interval || 60000,
  })

  return {
    check: (limit: number, token: string) => {
      const tokenCount = (tokenCache.get(token) as number[]) || [0]
      if (tokenCount[0] === 0) {
        tokenCache.set(token, [1])
      }
      tokenCount[0] += 1
      tokenCache.set(token, tokenCount)
      const currentUsage = tokenCount[0]
      const isRateLimited = currentUsage >= limit
      return new Promise((resolve, reject) => {
        if (isRateLimited) {
          reject()
        } else {
          resolve(currentUsage)
        }
      })
    },
  }
}
