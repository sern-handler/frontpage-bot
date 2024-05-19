import prisma from "@/lib/db";

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