import UserCard from "@/components/app/UserCard/UserCard";
import { validateRequest } from "@/lib/auth";
import prisma from "@/lib/db";
import { redirect } from "next/navigation";

export default async function Page() {
    const { user } = await validateRequest()
    if (!user) return redirect('/auth/login')
    
    const dbFetch = await prisma.bot.findMany({
        where: {
            userId: user.id
        }
    })
    return (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 p-4">
            {dbFetch.map((bot) => (
                <UserCard key={bot.id} {...bot} />
            ))}
        </div>
    )
}