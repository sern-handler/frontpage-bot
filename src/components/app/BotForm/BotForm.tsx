'use client'

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import SubmitButton from "../SubmitButton/SubmitButton";
import { revalidatePathServer, submitBotData, updateBotProfilePicture } from "@/lib/actions";
import { useFormState } from "react-dom";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function BotForm(props: Props) {
    const router = useRouter()
    const [submitData, submitDataAction] = useFormState(submitBotData, null);
    const [regenLoading, setRegenLoading] = useState(false)
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
                            <Input name="inviteLink" id="inviteLink" type="text" defaultValue={props?.inviteLink} />
                        </div>
                        <div className="col-span-2">
                            <Label htmlFor="srcLink">Repo link (optional)</Label>
                            <Input name="srcLink" id="srcLink" type="text" defaultValue={props?.srcLink || ''} />
                        </div>
                </div>
                <div className="flex items-center justify-center p-2 gap-2">
                    {props.botId && (
                        <Button variant="secondary" loading={regenLoading} type="button" onClick={() => {
                            setRegenLoading(true)
                            updateBotProfilePicture({ botId: props.botId! }).then((res) => {
                                setRegenLoading(false)
                                if (res.error) {
                                    toast.error(res.error)
                                }
                                if (res.success) {
                                    toast.success(res.message)
                                    revalidatePathServer('/dashboard')
                                    router.push('/dashboard')
                                }
                            })
                        }}>
                            Regenerate profile picture
                        </Button>
                    )}
                    <SubmitButton buttonText="Submit" />
                </div>
            </div>
            {props.id && (
                <div className="flex items-center justify-center p-2">
                    <Alert variant={"warning"} className="w-[400px]">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Warning</AlertTitle>
                        <AlertDescription className="whitespace-pre-line">
                            When resubmitting, the bot will be unverified until the devteam verifies it again.{'\n'}
                            This doesn't apply when it's just regenerating the profile picture
                        </AlertDescription>
                    </Alert>
                </div>
            )}
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