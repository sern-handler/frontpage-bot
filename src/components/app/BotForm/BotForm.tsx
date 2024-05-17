'use client'

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import SubmitButton from "../SubmitButton/SubmitButton";
import { submitBotData } from "@/lib/actions";
import { useFormState } from "react-dom";
import { useEffect } from "react";
import { toast } from "sonner";

export default function BotForm(props: Props) {
    const [submitData, submitDataAction] = useFormState(submitBotData, null);
    useEffect(() => {
        if (submitData?.error) {
            toast.error(submitData.error)
        }
    }, [submitData])
    return (
        <form action={submitDataAction}>
            {props.id && <input type="hidden" name="id" value={props.id} />}
            <div className="flex flex-col items-center justify-center">
                <div className="grid grid-cols-2 p-2 gap-4 sm:p-4 sm:w-[50%] w-full">
                        <div>
                            <Label htmlFor="botName">Bot name</Label>
                            <Input name="name" id="name" required type="text" defaultValue={props?.name} />
                        </div>
                        <div>
                            <Label htmlFor="description">Description</Label>
                            <Input name="description" id="description" required type="text" defaultValue={props?.description} />
                        </div>
                        <div>
                            <Label htmlFor="botId">Bot user id</Label>
                            <Input name="botId" id="botId" required type="text" defaultValue={props?.botId} />
                        </div>
                        <div>
                            <Label htmlFor="inviteLink">Invite link</Label>
                            <Input name="inviteLink" id="inviteLink" required type="text" defaultValue={props?.inviteLink} />
                        </div>
                        <div className="col-span-2">
                            <Label htmlFor="srcLink">Repo link (optional)</Label>
                            <Input name="srcLink" id="srcLink" type="text" defaultValue={props?.srcLink || ''} />
                        </div>
                </div>
                <SubmitButton buttonText="Submit" />
            </div>
        </form>
    )
}

interface Props {
    id?: string;
    name?: string;
    description?: string;
    botId?: string;
    inviteLink?: string;
    srcLink?: string;
}