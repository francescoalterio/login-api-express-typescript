import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function createPost(post: string, userId: number): Promise<void> {
  const data = await prisma.post.create({
    data: {
      post,
      userId,
    },
  });

  return undefined;
}
