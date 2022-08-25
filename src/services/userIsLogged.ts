import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function userIsLogged(
  sessionId: string
): Promise<number | undefined> {
  const sessionData = await prisma.session.findFirst({
    where: {
      cookie: sessionId,
    },
  });
  if (sessionData === null) return undefined;
  else return sessionData.userId;
}
