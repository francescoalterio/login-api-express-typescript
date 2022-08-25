import { PrismaClient } from "@prisma/client";
import { Post } from "../types";

const prisma = new PrismaClient();

export async function getUserPostsById(userId: number) {
  const posts = await prisma.post.findMany({
    where: {
      userId,
    },
  });

  return posts;
}
