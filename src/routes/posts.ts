import { Router } from "express";
import { userIsLogged } from "../services/userIsLogged";
import { getUserPostsById } from "../services/getUserPostsById";
import { createPost } from "../services/createPost";
import { deletePost } from "../services/deletePost";

const postsRouter = Router();

postsRouter.get("/", async (req, res) => {
  const { sessionId } = req.cookies;
  console.log(sessionId);
  try {
    const userId = await userIsLogged(sessionId);
    if (userId === undefined) return res.json({ isLogged: false }).status(404);
    const posts = await getUserPostsById(userId);
    console.log(posts);
    return res.json({ posts, isLogged: true });
  } catch (error) {
    return res.json({ isLogged: false }).status(404);
  }
});

postsRouter.post("/create", async (req, res) => {
  const { post } = req.body;
  const { sessionId } = req.cookies;

  console.log(post, sessionId);
  try {
    const userId = await userIsLogged(sessionId);
    if (userId === undefined) return res.json({ isLogged: false }).status(404);
    console.log(post, userId);
    await createPost(post, userId);
    console.log("creado");
    const posts = await getUserPostsById(userId);
    return res.json({ posts });
  } catch ({ message }) {
    console.log(message);
    return res.json({ isLogged: false }).status(404);
  }
});

postsRouter.delete("/delete", async (req, res) => {
  const { postId } = req.body;
  const { sessionId } = req.cookies;
  console.log(postId);
  try {
    const userId = await userIsLogged(sessionId);
    if (userId === undefined) return res.json({ isLogged: false }).status(404);
    await deletePost(postId);
    const posts = await getUserPostsById(userId);
    return res.json({ posts });
  } catch ({ message }) {
    console.log(message);
    return res.json({ isLogged: false }).status(404);
  }
});

export default postsRouter;
