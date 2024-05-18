import { validateRequest } from "@/lib/auth";
import { redirect } from "next/navigation";
import BotForm from "@/components/app/BotForm/BotForm";
import prisma from "@/lib/db";
import { nullsToUndefined } from "@/lib/utils";

export default async function Page({ params }: { params: { id: string } }) {
    const { user } = await validateRequest()
    if (!user) return redirect('/auth/signIn')
    
    const dbFetch = await prisma.bot.findUnique({
        where: {
            id: params.id
        }
    })
    if (!dbFetch) return redirect('/dashboard')
    if (dbFetch.userId !== user.id) return redirect('/dashboard')
    
    return (
        <>
            <BotForm { ...nullsToUndefined(dbFetch) } />
        </>
    )
}