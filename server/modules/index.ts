
import { configDotenv } from "dotenv";
import express from "express";
import { createAvatar } from "./controller/avatar.controller";

const app = express();
app.use(express.json());

configDotenv();

app.listen(process.env.AVATAR_PORT, () => {
  console.log(`🚀 restapi Server ready at http://localhost:${process.env.AVATAR_PORT}`);
});

app.post("/avatar", createAvatar)

// app.use("/avatar", createAvatar)