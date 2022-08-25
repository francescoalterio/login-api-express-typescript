import express from "express";
import loginRouter from "./routes/login";
import cookieParser from "cookie-parser";

import path from "path";
import postsRouter from "./routes/posts";
import registerRouter from "./routes/register";

const app = express();
const PORT = 3000;

//middlewares
app.use(express.json());
app.use(cookieParser());

//Routes
app.use("/login", loginRouter);
app.use("/posts", postsRouter);
app.use("/register", registerRouter);

app.get("/", (req, res) => {
  return res.sendFile(path.join(__dirname, "./frontend/index.html"));
});

app.listen(PORT, () => {
  console.log(`El servidor esta corriendo en el puerto: ${PORT}`);
});
