import UserCard from "@/components/app/UserCard/UserCard";
import { validateRequest } from "@/lib/auth";
import prisma from "@/lib/db";
import Image from "next/image";
import NoBots from '../../../public/noBots.png'
import { redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";

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
            {dbFetch.length === 0 && (
                <div className="flex items-center justify-center flex-col">
                    <Image src={NoBots} alt="Megamind meme with a caption saying No bots?" />
                    <Link href="/add">
                        <Button className="mt-8">Create a bot</Button>
                    </Link>
                </div>
            )}
        </div>
    )
}