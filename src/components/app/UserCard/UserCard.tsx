import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import type { Bot } from "@prisma/client"
import Link from "next/link"
import VerifiedSwitch from "../VerifiedSwitch/VerifiedSwitch"

export default function UserCard(props: Bot & { isAdminPanel?: boolean }) {
  const yes = <span className="text-green-500">Yes</span>
  const no = <span className="text-red-500">No</span>
  return (
    <>
      <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-4">
        <div className="flex items-center justify-center space-x-4">
          <Avatar className="w-14 h-14">
            <AvatarImage src={props.pfpLink} alt="sernbot" />
          </Avatar>
          <h1 className="flex-grow text-center font-extrabold text-2xl">
            {props.name}
          </h1>
        </div>
        <div className="pt-4">
          <p>{props.description}</p>
          {!props.isAdminPanel && <p className="text-sm">Verified: {props.verified ? yes : no}</p>}
          {props.isAdminPanel && <p className="text-sm">Bot ID: <code className="bg-zinc-800 p-0.5">{props.botId}</code></p>}
        </div>
        <div className="flex justify-end mt-4 gap-4">
          {props.srcLink && (
            <Link href={props.srcLink} target="_blank">
              <Button variant={"secondaryFilledLink"}>Source</Button>
            </Link>
          )}
          {props.inviteLink && (
            <Link href={props.inviteLink} target="_blank">
              <Button variant={"secondaryFilledLink"}>Invite</Button>
            </Link>
          )}
          {props.isAdminPanel && <VerifiedSwitch id={props.id} verified={props.verified} />}
          {!props.isAdminPanel && (
            <>
              <Link href={`/dashboard/${props.id}`}>
                <Button>Settings</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </>
  );
}
