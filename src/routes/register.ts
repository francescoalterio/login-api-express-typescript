import { Router } from "express";
import path from "path";
import { createUser } from "../services/createUser";
import { getUserByEmail } from "../services/getUserByEmail";

const registerRouter = Router();

registerRouter.get("/", (req, res) => {
  return res.sendFile(path.join(__dirname, "../frontend/register.html"));
});

registerRouter.post("/", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await getUserByEmail(email);
    if (user !== null)
      return res
        .json({ message: "The user exists", isRegistered: false })
        .status(403);

    await createUser(email, password);
    return res.json({ isRegistered: true });
  } catch ({ message }) {
    res.sendStatus(404);
    console.log(message);
  }
});

export default registerRouter;
