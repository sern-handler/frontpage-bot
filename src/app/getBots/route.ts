import prisma from "@/lib/db";

export const dynamic = 'force-dynamic'

export async function GET() {
    const dbFetch = await prisma.bot.findMany({
        where: {
            verified: true
        }
    })
    return new Response(JSON.stringify(dbFetch), {
        headers: {
            'content-type': 'application/json'
        }
    })
}