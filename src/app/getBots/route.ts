import prisma from "@/lib/db";
import { RateLimiter } from '@/lib/ratelimiter'

export const dynamic = 'force-dynamic'

// 5 requests per minute
const rateLimiter = new RateLimiter({
    windowSize: 60 * 1000,
    maxRequests: 5,
})

export async function GET(req: Request) {
    const ip = req.headers.get('X-Forwarded-For') ?? 'unknown';
    const isRateLimited = rateLimiter.limit(ip);

    if (isRateLimited) {
        return new Response(JSON.stringify({ success: false, message: 'rate limited!' }), {
            status: 429,
        });
    }

    const dbFetch = await prisma.bot.findMany({
        where: {
            verified: true
        }
    })
    return new Response(JSON.stringify(emptyValToNull(dbFetch)), {
        headers: {
            'content-type': 'application/json'
        }
    })
}

function emptyValToNull(obj: any) {
    for (const key in obj) {
        if (typeof obj[key] === 'object') {
            emptyValToNull(obj[key]);
        } else {
            if (obj[key] === '') {
                obj[key] = null;
            }
        }
    }
    return obj;
}