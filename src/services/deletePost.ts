import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function deletePost(postId: number): Promise<void> {
  const data = await prisma.post.delete({
    where: {
      id: postId,
    },
  });

  return undefined;
}
