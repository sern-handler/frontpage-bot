import UserCard from "@/components/app/UserCard/UserCard";
import { validateRequest } from "@/lib/auth";
import prisma from "@/lib/db";
import { redirect } from "next/navigation";

export default async function Page() {
    const { user } = await validateRequest()
    if (!user) return redirect('/auth/signIn')
    if (!user.isAdmin) return (
        <h1 className="text-center font-extrabold text-6xl">Sorry</h1>
    )

    const getBots = await prisma.bot.findMany()
    return (
        <>
            <h1 className="text-center font-extrabold text-4xl">wow an admin panel</h1>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 p-4">
                {getBots.map((bot) => (
                    <UserCard key={bot.id} {...bot} isAdminPanel />
                ))}
            </div>
        </>
    )
}