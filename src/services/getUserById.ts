import { PrismaClient } from "@prisma/client";
import { User } from "../types";

const prisma = new PrismaClient();

export async function getUserById(id: number): Promise<User | null> {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  return user;
}
