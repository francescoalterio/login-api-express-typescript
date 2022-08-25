import { PrismaClient } from "@prisma/client";
import { User } from "../types";

const prisma = new PrismaClient();

export async function getUserByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
        where: {
            email: email
        }
    })

    return user
}