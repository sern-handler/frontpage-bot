'use server'

import { redirect } from "next/navigation";
import { validateRequest } from "./auth";
import prisma from "./db";
import { botSubmitSchema } from "./zod";
import poster from '@sern/poster';

export async function submitBotData(prev: any, formData: FormData): Promise<DefaultActionResponse> {
    const parsedData = await botSubmitSchema.safeParseAsync(Object.fromEntries(formData.entries()));
    const { user } = await validateRequest();
    if (!user) {
        return {
            success: false,
            error: "You must be logged in to perform this action",
        };
    }
    if (!parsedData.success) {
        return {
            success: false,
            error: `From ${parsedData.error.errors[0].path[0]}: ${parsedData.error.errors[0].message}`,
        };
    }
    
    if (parsedData.data.id) {
        await prisma.bot.update({
            where: {
                id: parsedData.data.id,
            },
            data: parsedData.data,
        });
    } else {
        const { name, botId, inviteLink, srcLink, description } = parsedData.data;

        const botClient = await poster.client(process.env.DSC_TOKEN!);
        const userAvatarHash = (await (await botClient('user/get', { user_id: botId })).json()).avatar;
        if (!userAvatarHash) {
            return {
                success: false,
                error: "Bot not found on Discord",
            };
        }
        const userAvatar = `https://cdn.discordapp.com/avatars/${botId}/${userAvatarHash}.webp`

        await prisma.bot.create({
            data: {
                name,
                botId,
                inviteLink,
                srcLink,
                description,
                pfpLink: userAvatar,
                userId: user.id,
            },
        });
    }
    
    redirect('/dashboard')
}

interface DefaultActionResponse {
    success: boolean;
    error?: string;
    message?: string;
    data?: any;
}