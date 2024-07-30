'use client'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { deleteBot } from "@/lib/actions";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function DeleteUser(props: Props) {
    const router = useRouter()
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild><Button variant={'destructive'}>Delete</Button></AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete {props.name}.
                </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction className="bg-destructive hover:bg-destructive/90" onClick={() => {
                    toast.info(`Deleting ${props.name}...`, { id: `delete-${props.id}` })
                    deleteBot({ id: props.id })
                        .then((r) => {
                            toast.dismiss(`delete-${props.id}`)
                            if (r.success) {
                                toast.success(r.message)
                                router.refresh()
                            } else {
                                toast.error(r.error)
                            }
                        })
                }}>Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}

interface Props {
    id: string;
    name: string;
}