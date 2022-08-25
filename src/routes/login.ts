import { Router } from "express";
import path from "path";
import { addUserSession } from "../services/addUserSession";
import { getUserByEmail } from "../services/getUserByEmail";
import { uniqueId } from "../services/uniqueId";
import { User } from "../types";

const loginRouter = Router();

loginRouter.get("/", (req, res) => {
  return res.sendFile(path.join(__dirname, "../frontend/login.html"));
});

loginRouter.post("/", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await getUserByEmail(email);
    if (user === null)
      return res
        .json({ message: "Email or password incorrect", isLogged: false })
        .status(404);
    if (user?.password !== password) return res.sendStatus(404);
    const sessionId = uniqueId(email);
    const userCookie = await addUserSession(user.id, sessionId);
    res.cookie("sessionId", userCookie === undefined ? sessionId : userCookie, {
      httpOnly: true,
    });
    return res.json({ isLogged: true });
  } catch ({ message }) {
    res.sendStatus(403);
    console.log(message);
  }
});

export default loginRouter;
