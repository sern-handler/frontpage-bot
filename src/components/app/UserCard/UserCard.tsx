import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import type { Bot } from "@prisma/client"
import Link from "next/link"

export default function UserCard(props: Bot) {
    const yes = <span className="text-green-500">Yes</span>
    const no = <span className="text-red-500">No</span>
    return (
        <>
            <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-4">
                <div className="flex items-center justify-center space-x-4">
                    <Avatar className="w-14 h-14">
                        <AvatarImage src={props.pfpLink} alt="sernbot" />
                    </Avatar>
                    <h1 className="flex-grow text-center font-extrabold text-2xl">{props.name}</h1>
                </div>
                <div className="pt-4">
                    <p>{props.description}</p>
                    <p className="text-sm">Verified: {props.verified ? yes : no}</p>
                </div>
                <div className="flex justify-end mt-4 gap-4">
                    {props.srcLink && (
                        <Link href={props.srcLink} target="_blank">
                            <Button variant={'secondaryFilledLink'}>Source</Button>
                        </Link>
                    )}
                    <Link href={props.inviteLink} target="_blank">
                        <Button variant={'secondaryFilledLink'}>Invite</Button>
                    </Link>
                    <Link href={`/dashboard/${props.id}`} target="_blank">
                        <Button>Settings</Button>
                    </Link>
                </div>
            </div>
        </>
    )
}