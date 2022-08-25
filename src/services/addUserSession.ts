import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function addUserSession(
  userId: number,
  sessionId: string
): Promise<string | undefined> {
  const sessionData = await prisma.session.findFirst({
    where: {
      userId,
    },
  });
  console.log(sessionData);
  if (sessionData === null) {
    const data = await prisma.session.create({
      data: {
        userId,
        cookie: sessionId,
      },
    });
    return undefined;
  } else {
    return sessionData.cookie;
  }
}
